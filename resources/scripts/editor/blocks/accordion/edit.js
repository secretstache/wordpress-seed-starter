import { useBlockProps } from '@wordpress/block-editor';

export const edit = () => {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <p>Accordion</p>
        </div>
    );
};
