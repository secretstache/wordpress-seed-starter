import { addFilter } from '@wordpress/hooks';
import { getBlockTypes } from '@wordpress/blocks';

export const addAllowedBlocksForColumnFilter = () => {
    addFilter(
        'blocks.registerBlockType',
        'ssm/dynamic/allowed-blocks-for-column',
        (blockSettings, blockName) => {
            if (blockName !== 'core/column') {
                return blockSettings;
            }

            // get all blockTypes
            blockSettings.allowedBlocks = getBlockTypes()
                ?.filter((allowedBlock) => {
                    const hasParent = !!allowedBlock?.parent;
                    const isComponentsCategory = allowedBlock?.category === 'ssm-components';
                    const isColumn = allowedBlock.name === 'core/columns';

                    return (isComponentsCategory && !hasParent) || isColumn;
                })
                ?.map(allowedBlock => allowedBlock.name);

            return blockSettings;
        },
    );
};
