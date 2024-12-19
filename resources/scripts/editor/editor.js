import domReady from '@wordpress/dom-ready';
import { filters, removeFilter } from '@wordpress/hooks';
import { dispatch, select, subscribe } from '@wordpress/data';
import {
    waitForRootContainer,
    addSetRootBlockFilter,
    addUnsetRootBlockFilter,
    addRootBlockVisibilityFilter,
    setRootBlockAppender,
    unsetRootBlockAppender,
} from '@secretstache/wordpress-gutenberg';

import './blocks/section-wrapper/index.js';
import './blocks/accordion/index.js';
import './blocks/block-grid/index.js';
import './blocks/content-slider/index.js';
import './blocks/split-content/index.js';
import './blocks/tabs/index.js';
import './blocks/call-to-action/index.js';
import './blocks/logo-wall/index.js';
import './blocks/blog-feed/index.js';
import './blocks/team-members/index.js';
import './blocks/icon/index.js';
import './blocks/testimonials/index.js';

import { addBlockCategoriesFilter, addAllowedBlocksForColumnFilter, addBlocksCompleterFilter } from '@scripts/editor/filters/index.js';
import { unsetBlocks, unsetVariations, setButtonStyles } from '@scripts/editor/utils/index.js';

const rootBlockName = 'ssm/section-wrapper';

const getFiltersByNamespace = (namespace) => {
    const namespaces = [];

    Object.entries(filters).forEach(([filterName, filterData]) => {
        const handlers = filterData.handlers || [];

        handlers.forEach((handler) => {
            if (handler.namespace.startsWith(namespace)) {
                namespaces.push({ filterName, namespace: handler.namespace });
            }
        });
    });

    return namespaces;
};

const setRootBlockForPostTypes = (
    rootBlockName,
    postTypes = ['page'],
    callback,
    initAppender = true,
    appenderTooltipText = 'Add Row',
) => {
    let isRootBlockEnabled = false;

    const removeDynamicFilters = () => {
        const filters = getFiltersByNamespace('ssm/dynamic/');

        filters.forEach(({ filterName, namespace }) => {
            console.log(`Removing filter: ${filterName}, namespace: ${namespace}`);
            removeFilter(filterName, namespace);
        });
    };

    waitForRootContainer().then(() => {
        console.log('Root Container found.');

        subscribe(() => {
            const currentPostType = select('core/editor').getCurrentPostType();

            if (postTypes.includes(currentPostType) && !isRootBlockEnabled) {
                console.log('add root block');

                isRootBlockEnabled = true;

                removeDynamicFilters();

                addSetRootBlockFilter(rootBlockName);

                if (callback) {
                    const afterFiltersCallback = callback({ isRootBlockEnabled, currentPostType })
                    dispatch('core/blocks').reapplyBlockTypeFilters();

                    if (afterFiltersCallback) {
                        afterFiltersCallback();
                    }
                }

                if (initAppender) {
                    setRootBlockAppender(rootBlockName, appenderTooltipText);
                }
            } else if (!postTypes.includes(currentPostType) && isRootBlockEnabled) {
                console.log('remove root block');
                isRootBlockEnabled = false;

                removeDynamicFilters();

                addUnsetRootBlockFilter(rootBlockName);

                if (callback) {
                    callback({ isRootBlockEnabled, currentPostType });
                }

                if (callback) {
                    const afterFiltersCallback = callback({ isRootBlockEnabled, currentPostType })
                    dispatch('core/blocks').reapplyBlockTypeFilters();

                    if (afterFiltersCallback) {
                        afterFiltersCallback();
                    }
                }

                if (initAppender) {
                    unsetRootBlockAppender();
                }
            }
        }, 'core/block-editor');
    })
};

addBlockCategoriesFilter();

domReady(() => {
    setRootBlockForPostTypes(rootBlockName, ['page'], ({ isRootBlockEnabled }) => {
        console.log('callback');

        if (isRootBlockEnabled) {
            addRootBlockVisibilityFilter(rootBlockName);
            addAllowedBlocksForColumnFilter();
            addBlocksCompleterFilter();
        }

        return () => {
            unsetBlocks();
            setButtonStyles();
            unsetVariations();
        };
    });
});


