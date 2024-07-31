import { registerBlockType } from '@wordpress/blocks';

import { edit } from './edit.js';

import blockMetadata from './block.json';

registerBlockType(blockMetadata, {
    edit,
});
