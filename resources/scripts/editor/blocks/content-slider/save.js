import { useBlockProps } from '@wordpress/block-editor';

export const save = () => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <p>Content Slider</p>
        </div>
    );
};
