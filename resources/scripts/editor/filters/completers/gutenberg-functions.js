/**
 * These functions are copied from the Gutenberg source code.
 */

import { useCallback, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { createBlock, createBlocksFromInnerBlocksTemplate, parse, store as blocksStore } from '@wordpress/blocks';
import removeAccents from 'remove-accents';
import { noCase } from 'change-case';

export const useBlockTypesState = ( rootClientId, onInsert, isQuick ) => {
    const options = useMemo(
        () => ( { [ Symbol('withRootClientIdOptionKey') ]: ! isQuick } ),
        [ isQuick ],
    );

    const [ items ] = useSelect(
        ( select ) => [
            select( blockEditorStore ).getInserterItems(
                rootClientId,
                options,
            ),
        ],
        [ rootClientId, options ],
    );

    const [ categories, collections ] = useSelect( ( select ) => {
        const { getCategories, getCollections } = select( blocksStore );

        return [ getCategories(), getCollections() ];
    }, [] );

    const onSelectItem = useCallback(
        (
            {
                name,
                initialAttributes,
                innerBlocks,
                syncStatus,
                content,
                rootClientId: _rootClientId,
            },
            shouldFocusBlock,
        ) => {
            const insertedBlock =
                syncStatus === 'unsynced'
                    ? parse( content, {
                        __unstableSkipMigrationLogs: true,
                    } )
                    : createBlock(
                        name,
                        initialAttributes,
                        createBlocksFromInnerBlocksTemplate( innerBlocks ),
                    );

            onInsert(
                insertedBlock,
                undefined,
                shouldFocusBlock,
                _rootClientId,
            );
        },
        [ onInsert ],
    );

    return [ items, categories, collections, onSelectItem ];
};

export const searchBlockItems = (
    items,
    categories,
    collections,
    searchInput,
) => {
    const normalizedSearchTerms = getNormalizedSearchTerms( searchInput );
    if ( normalizedSearchTerms.length === 0 ) {
        return items;
    }

    const config = {
        getCategory: ( item ) =>
            categories.find( ( { slug } ) => slug === item.category )?.title,
        getCollection: ( item ) =>
            collections[ item.name.split( '/' )[ 0 ] ]?.title,
    };

    return searchItems( items, searchInput, config );
};

/**
 * Filters an item list given a search term.
 *
 * @param {Array}  items       Item list
 * @param {string} searchInput Search input.
 * @param {Object} config      Search Config.
 *
 * @return {Array} Filtered item list.
 */
export const searchItems = ( items = [], searchInput = '', config = {} ) => {
    const normalizedSearchTerms = getNormalizedSearchTerms( searchInput );
    if ( normalizedSearchTerms.length === 0 ) {
        return items;
    }

    const rankedItems = items
        .map( ( item ) => {
            return [ item, getItemSearchRank( item, searchInput, config ) ];
        } )
        .filter( ( [ , rank ] ) => rank > 0 );

    rankedItems.sort( ( [ , rank1 ], [ , rank2 ] ) => rank2 - rank1 );

    return rankedItems.map( ( [ item ] ) => item );
};

// Default search helpers.
const defaultGetName = ( item ) => item.name || '';
const defaultGetTitle = ( item ) => item.title;
const defaultGetDescription = ( item ) => item.description || '';
const defaultGetKeywords = ( item ) => item.keywords || [];
const defaultGetCategory = ( item ) => item.category;
const defaultGetCollection = () => null;

/**
 * Get the search rank for a given item and a specific search term.
 * The better the match, the higher the rank.
 * If the rank equals 0, it should be excluded from the results.
 *
 * @param {Object} item       Item to filter.
 * @param {string} searchTerm Search term.
 * @param {Object} config     Search Config.
 *
 * @return {number} Search Rank.
 */
export function getItemSearchRank( item, searchTerm, config = {} ) {
    const {
        getName = defaultGetName,
        getTitle = defaultGetTitle,
        getDescription = defaultGetDescription,
        getKeywords = defaultGetKeywords,
        getCategory = defaultGetCategory,
        getCollection = defaultGetCollection,
    } = config;

    const name = getName( item );
    const title = getTitle( item );
    const description = getDescription( item );
    const keywords = getKeywords( item );
    const category = getCategory( item );
    const collection = getCollection( item );

    const normalizedSearchInput = normalizeString( searchTerm );
    const normalizedTitle = normalizeString( title );

    let rank = 0;

    // Prefers exact matches
    // Then prefers if the beginning of the title matches the search term
    // name, keywords, categories, collection, variations match come later.
    if ( normalizedSearchInput === normalizedTitle ) {
        rank += 30;
    } else if ( normalizedTitle.startsWith( normalizedSearchInput ) ) {
        rank += 20;
    } else {
        const terms = [
            name,
            title,
            description,
            ...keywords,
            category,
            collection,
        ].join( ' ' );

        const normalizedSearchTerms = extractWords( normalizedSearchInput );
        const unmatchedTerms = removeMatchingTerms(
            normalizedSearchTerms,
            terms,
        );

        if ( unmatchedTerms.length === 0 ) {
            rank += 10;
        }
    }

    // Give a better rank to "core" namespaced items.
    if ( rank !== 0 && name.startsWith( 'core/' ) ) {
        const isCoreBlockVariation = name !== item.id;
        // Give a bit better rank to "core" blocks over "core" block variations.
        rank += isCoreBlockVariation ? 1 : 2;
    }

    return rank;
}

const removeMatchingTerms = ( unmatchedTerms, unprocessedTerms ) => {
    return unmatchedTerms.filter(
        ( term ) =>
            ! getNormalizedSearchTerms( unprocessedTerms ).some(
                ( unprocessedTerm ) => unprocessedTerm.includes( term ),
            ),
    );
};

/**
 * Converts the search term into a list of normalized terms.
 *
 * @param {string} input The search term to normalize.
 *
 * @return {string[]} The normalized list of search terms.
 */
export const getNormalizedSearchTerms = ( input = '' ) => {
    return extractWords( normalizeString( input ) );
};

// Normalization regexes
const splitRegexp = [
    /([\p{Ll}\p{Lo}\p{N}])([\p{Lu}\p{Lt}])/gu, // One lowercase or digit, followed by one uppercase.
    /([\p{Lu}\p{Lt}])([\p{Lu}\p{Lt}][\p{Ll}\p{Lo}])/gu, // One uppercase followed by one uppercase and one lowercase.
];
const stripRegexp = /(\p{C}|\p{P}|\p{S})+/giu; // Anything that's not a punctuation, symbol or control/format character.

// Normalization cache
const extractedWords = new Map();
const normalizedStrings = new Map();

/**
 * Extracts words from an input string.
 *
 * @param {string} input The input string.
 *
 * @return {Array} Words, extracted from the input string.
 */
export function extractWords( input = '' ) {
    if ( extractedWords.has( input ) ) {
        return extractedWords.get( input );
    }

    const result = noCase( input, {
        splitRegexp,
        stripRegexp,
    } )
        .split( ' ' )
        .filter( Boolean );

    extractedWords.set( input, result );

    return result;
}

/**
 * Sanitizes the search input string.
 *
 * @param {string} input The search input to normalize.
 *
 * @return {string} The normalized search input.
 */
export function normalizeString( input = '' ) {
    if ( normalizedStrings.has( input ) ) {
        return normalizedStrings.get( input );
    }

    // Disregard diacritics.
    //  Input: "média"
    let result = removeAccents( input );

    // Accommodate leading slash, matching autocomplete expectations.
    //  Input: "/media"
    result = result.replace( /^\//, '' );

    // Lowercase.
    //  Input: "MEDIA"
    result = result.toLowerCase();

    normalizedStrings.set( input, result );

    return result;
}

export const orderInserterBlockItems = ( items, priority ) => {
    if ( ! priority ) {
        return items;
    }

    items.sort( ( { id: aName }, { id: bName } ) => {
        // Sort block items according to `priority`.
        let aIndex = priority.indexOf( aName );
        let bIndex = priority.indexOf( bName );

        // All other block items should come after that.
        if ( aIndex < 0 ) {
            aIndex = priority.length;
        }

        if ( bIndex < 0 ) {
            bIndex = priority.length;
        }

        return aIndex - bIndex;
    } );

    return items;
};

/**
 * Recursive stable sorting comparator function.
 *
 * @param {string|Function} field Field to sort by.
 * @param {Array}           items Items to sort.
 * @param {string}          order Order, 'asc' or 'desc'.
 * @return {Function} Comparison function to be used in a `.sort()`.
 */
const comparator = ( field, items, order ) => {
    return ( a, b ) => {
        let cmpA, cmpB;

        if ( typeof field === 'function' ) {
            cmpA = field( a );
            cmpB = field( b );
        } else {
            cmpA = a[ field ];
            cmpB = b[ field ];
        }

        if ( cmpA > cmpB ) {
            return order === 'asc' ? 1 : -1;
        } else if ( cmpB > cmpA ) {
            return order === 'asc' ? -1 : 1;
        }

        const orderA = items.findIndex( ( item ) => item === a );
        const orderB = items.findIndex( ( item ) => item === b );

        // Stable sort: maintaining original array order
        if ( orderA > orderB ) {
            return 1;
        } else if ( orderB > orderA ) {
            return -1;
        }

        return 0;
    };
};

/**
 * Order items by a certain key.
 * Supports decorator functions that allow complex picking of a comparison field.
 * Sorts in ascending order by default, but supports descending as well.
 * Stable sort - maintains original order of equal items.
 *
 * @param {Array}           items Items to order.
 * @param {string|Function} field Field to order by.
 * @param {string}          order Sorting order, `asc` or `desc`.
 * @return {Array} Sorted items.
 */
export function orderBy( items, field, order = 'asc' ) {
    return items.concat().sort( comparator( field, items, order ) );
}
