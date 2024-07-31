import { useBlockProps } from '@wordpress/block-editor';

export const save = () => {
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <p>Logo Wall</p>
        </div>
    );
};
