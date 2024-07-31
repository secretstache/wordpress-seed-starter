import domReady from '@wordpress/dom-ready';

import './blocks/accordion/index'
import './blocks/block-grid/index'
import './blocks/content-slider/index'
import './blocks/split-content/index'
import './blocks/tabs/index'
import './blocks/call-to-action/index.js';
import './blocks/logo-wall/index.js';
import './blocks/blog-feed/index.js';
import './blocks/team-members/index.js';
import './blocks/icon/index.js';
import './blocks/testimonials/index.js';

import { reassignBlockCategories } from '@scripts/editor/filters/index.js';
import { unsetBlocks } from '@scripts/editor/utils/index.js';

reassignBlockCategories();

domReady(() => {

    unsetBlocks();

});
