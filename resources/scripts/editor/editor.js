import domReady from '@wordpress/dom-ready';

import { reassignBlockCategories } from '@scripts/editor/filters/index.js';
import { unsetBlocks } from '@scripts/editor/utils/index.js';

reassignBlockCategories();

domReady(() => {

    unsetBlocks();

});
