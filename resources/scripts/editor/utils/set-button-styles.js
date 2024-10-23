import { registerBlockStyle, unregisterBlockStyle } from '@wordpress/blocks';

export const setButtonStyles = () => {
    unregisterBlockStyle('core/button', 'fill');
    unregisterBlockStyle('core/button', 'outline');

    registerBlockStyle('core/button', [
        {
            name: 'white',
            label: 'White',
        },
        {
            name: 'primary',
            label: 'Primary',
            isDefault: true,
        },
        {
            name: 'secondary',
            label: 'Secondary',
        },
        {
            name: 'tertiary',
            label: 'Tertiary',
        },
        {
            name: 'primary-outline',
            label: 'Primary Outline',
        },
        {
            name: 'secondary-outline',
            label: 'Secondary Outline',
        },
        {
            name: 'tertiary-outline',
            label: 'Tertiary Outline',
        },
    ]);
};
