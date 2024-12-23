import { addFilter, removeFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate, parse } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';

import { BlockIcon, store as blockEditorStore } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

import { orderBy, orderInserterBlockItems, searchBlockItems, useBlockTypesState } from './gutenberg-functions.js';

const noop = () => {};
const SHOWN_BLOCK_TYPES = 9;

const ssmBlocksCompleter = {
    name: 'ssm-blocks',
    className: 'block-editor-autocompleters__block',
    triggerPrefix: '/',

    useItems(filterValue) {
        const { rootClientId, selectedBlockName, prioritizedBlocks, parentCategory } =
            useSelect((select) => {
                const {
                    getSelectedBlockClientId,
                    getBlockName,
                    getBlockListSettings,
                    getBlockRootClientId,
                    getBlock,
                } = select(blockEditorStore);

                const selectedBlockClientId = getSelectedBlockClientId();
                const _rootClientId = getBlockRootClientId(selectedBlockClientId);

                const parentBlock = getBlock(_rootClientId);
                const parentCategory = parentBlock ? parentBlock.attributes.category : null;

                return {
                    selectedBlockName: selectedBlockClientId
                        ? getBlockName(selectedBlockClientId)
                        : null,
                    rootClientId: _rootClientId,
                    prioritizedBlocks:
                    getBlockListSettings(_rootClientId)
                        ?.prioritizedInserterBlocks,
                    parentCategory,
                };
            }, []);

        const [items, categories, collections] = useBlockTypesState(
            rootClientId,
            noop,
        );

        const filteredItems = useMemo(() => {
            let filteredItems = [];

            if (parentCategory === 'ssm-design') {
                filteredItems = items.filter((item) => item.category === 'ssm-templates');
            } else if (parentCategory === 'ssm-templates' || parentCategory === 'ssm-categories') {
                const allowedBlocks = prioritizedBlocks ?? items.filter(item => item.category === 'ssm-components');
                filteredItems = allowedBlocks.length ? allowedBlocks : items;
            } else if (parentCategory === 'ssm-components') {
                filteredItems = prioritizedBlocks ?? items;
            } else {
                // eslint-disable-next-line
                filteredItems = !!filterValue.trim()
                    ? searchBlockItems(
                        items,
                        categories,
                        collections,
                        filterValue,
                    )
                    : orderInserterBlockItems(
                        orderBy(items, 'frecency', 'desc'),
                        prioritizedBlocks,
                    );
            }

            return filteredItems
                .filter((item) => item.name !== selectedBlockName)
                .slice(0, SHOWN_BLOCK_TYPES);
        }, [
            filterValue,
            selectedBlockName,
            items,
            categories,
            collections,
            prioritizedBlocks,
            parentCategory,
        ]);

        const options = useMemo(
            () =>
                filteredItems.map((blockItem) => {
                    const { title, icon, isDisabled } = blockItem;

                    return {
                        key: `block-${blockItem.id}`,
                        value: blockItem,
                        label: (
                            <>
                                <BlockIcon
                                    key="icon"
                                    icon={icon}
                                    showColors
                                />
                                {title}
                            </>
                        ),
                        isDisabled,
                    };
                }),
            [filteredItems],
        );

        return [options];
    },

    allowContext( before, after ) {
        return ! ( /\S/.test( before ) || /\S/.test( after ) );
    },

    getOptionCompletion( inserterItem ) {
        const {
            name,
            initialAttributes,
            innerBlocks,
            syncStatus,
            content,
        } = inserterItem;

        return {
            action: 'replace',
            value:
                syncStatus === 'unsynced'
                    ? parse( content, {
                        __unstableSkipMigrationLogs: true,
                    } )
                    : createBlock(
                        name,
                        initialAttributes,
                        createBlocksFromInnerBlocksTemplate(innerBlocks),
                    ),
        };
    },
};

export const blocksCompleterFilter = {
    add() {
        addFilter(
            'editor.Autocomplete.completers',
            'ssm/blocks-completer',
            (completers, blockName) => {
                const isParagraph = blockName === 'core/paragraph';
                const isHeading = blockName === 'core/heading';

                if (isParagraph || isHeading) {
                    return completers.map(
                        (completer) => completer.name === 'blocks'
                            ? ssmBlocksCompleter
                            : completer,
                    );
                }

                return completers;
            },
        );
    },
    remove() {
        removeFilter('editor.Autocomplete.completers', 'ssm/blocks-completer');
    },
}

