import domReady from '@wordpress/dom-ready';
import { getBlockVariations, unregisterBlockVariation } from '@wordpress/blocks';
import {
    setRootBlock,
    hideRootBlockForOtherBlocks,
} from '@secretstache/wordpress-gutenberg';

import './blocks/section-wrapper/index';
import './blocks/accordion/index';
import './blocks/block-grid/index';
import './blocks/content-slider/index';
import './blocks/split-content/index';
import './blocks/tabs/index';
import './blocks/call-to-action/index.js';
import './blocks/logo-wall/index.js';
import './blocks/blog-feed/index.js';
import './blocks/team-members/index.js';
import './blocks/icon/index.js';
import './blocks/testimonials/index.js';

import {
    reassignBlockCategories,
    setAllowedBlocksForColumn,
    replaceBlocksCompleter,
} from '@scripts/editor/filters/index.js';
import { unsetBlocks, setButtonStyles } from '@scripts/editor/utils/index.js';

reassignBlockCategories();

const rootBlockName = 'ssm/section-wrapper';

domReady(() => {
    hideRootBlockForOtherBlocks(rootBlockName);
    setRootBlock(rootBlockName);

    unsetBlocks();

    setAllowedBlocksForColumn();
    replaceBlocksCompleter();

    // unset unnecessary embed blocks
    getBlockVariations("core/embed")
        .forEach(function (embed) {
            if (embed.name !== "youtube" && embed.name !== "vimeo") {
                unregisterBlockVariation("core/embed", embed.name);
            }
        });

    setButtonStyles();
});
