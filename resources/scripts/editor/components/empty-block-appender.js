import { InnerBlocks } from '@wordpress/block-editor';

export const EmptyBlockAppender = (props) => {
    const {
        showIcon = true,
        title = 'This block is empty',
        text = 'Use the "+" button below to add content blocks',
    } = props;

    return (
        <div className="flex flex-col items-center justify-center h-full mt-10">
            <div className="text-center">
                {
                    showIcon && (
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    )
                }

                <h3 className="mt-4 text-lg font-light text-gray-900">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{text}</p>
            </div>

            <div className="mt-6">
                <InnerBlocks.ButtonBlockAppender />
            </div>
        </div>
    );
};
