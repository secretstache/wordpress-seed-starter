import { useBlockProps } from '@wordpress/block-editor';

export const edit = () => {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <p>Content Slider</p>
        </div>
    );
};
