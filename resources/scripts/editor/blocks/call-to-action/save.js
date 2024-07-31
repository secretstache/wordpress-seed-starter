import { useBlockProps } from '@wordpress/block-editor';

export const save = () => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <p>Call To Action</p>
        </div>
    );
};
