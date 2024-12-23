import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
    PanelBody,
    __experimentalDivider as Divider,
    ToggleControl,
    BaseControl,
} from '@wordpress/components';
import classNames from 'classnames';
import {
    InsertBlockToolbar,
    ResponsiveSpacingControl,
    ColorPaletteControl,
    getSpacingClasses,
    MediaTypeControl,
    useAllowedBlocks,
} from '@secretstache/wordpress-gutenberg';

import { EmptyBlockAppender } from '@scripts/editor/components/empty-block-appender.js';

export const edit = ({ name: blockName, attributes, setAttributes, clientId }) => {
    const {
        backgroundColor = { value: '#fff', slug: 'white' },
        isIncludeBackgroundMedia,
        backgroundMediaType = 'image',
        media,
        isIncludeOverlay,
        overlayColor,

        isFullViewportHeight,
        spacing,
    } = attributes;

    const isBackgroundTypeImage = backgroundMediaType === 'image';
    const isBackgroundTypeVideo = backgroundMediaType === 'video';

    const hasSelectedBackgroundImage = isBackgroundTypeImage && media?.url;
    const hasSelectedBackgroundVideo = isBackgroundTypeVideo && media?.url;

    const hasSelectedBackgroundColor = !!backgroundColor?.slug;
    const hasSelectedOverlayColor = isIncludeOverlay && !!overlayColor?.slug;

    const onIncludeBackgroundMediaChange = useCallback(() => {
        setAttributes({
            isIncludeBackgroundMedia: !isIncludeBackgroundMedia,
        });
    }, [ isIncludeBackgroundMedia ]);

    const onBackgroundMediaTypeChange = useCallback((mediaType) => {
        setAttributes({ backgroundMediaType: mediaType, media: {} });
    }, []);

    const onMediaSelect = useCallback((media) => {
        setAttributes({ media: { id: media?.id, url: media?.url }, backgroundMediaType });
    }, [ backgroundMediaType ]);

    const onMediaRemove = useCallback(() => {
        setAttributes({ media: {} });
    }, []);

    const onIncludeOverlayChange = useCallback(() => {
        setAttributes({ isIncludeOverlay: !isIncludeOverlay });
    }, [ isIncludeOverlay ]);

    const onIsFullViewportHeightChange = useCallback(() => {
        setAttributes({ isFullViewportHeight: !isFullViewportHeight });
    }, [ isFullViewportHeight ]);

    const onSpacingChange = useCallback((spacing) => {
        setAttributes({ spacing });
    }, []);

    const allowedBlocks = useAllowedBlocks(blockName, blockName);

    const hasInnerBlocks = useSelect((select) => {
        const { getBlockOrder } = select('core/block-editor');

        return getBlockOrder(clientId).length > 0;
    }, []);

    const deviceType = useSelect(
        (select) => select('core/edit-post')?.__experimentalGetPreviewDeviceType?.() || 'Desktop',
        [],
    );

    const blockProps = useBlockProps({
        className: classNames(
            '!max-w-full mx-auto relative isolate overflow-hidden mb-14 md:mb-24 last-of-type:mb-0 py-16',
            getSpacingClasses(spacing, 'md:spc-', 'spc-'),
            {
                [`bg-${backgroundColor?.slug}`]: hasSelectedBackgroundColor,
                'h-screen': isFullViewportHeight,
            },
        ),
    });

    const { ...innerBlocksProps } = useInnerBlocksProps({
        className: 'wp-block-ssm-section-wrapper__content relative container mx-auto z-10',
    }, {
        allowedBlocks,
        renderAppender: false,
    });

    return (
        <>
            <InsertBlockToolbar
                clientId={clientId}
                blockName={blockName}
                group="inline"
            />

            <InspectorControls>
                <PanelBody title="Settings">
                    <ColorPaletteControl
                        label="Background Color"
                        value={backgroundColor?.value}
                        attributeName="backgroundColor"
                        setAttributes={setAttributes}
                        allowedColors={['white', 'gray-300', 'primary-500', 'secondary-500', 'tertiary-500']}
                    />

                    <Divider margin={2} />

                    <ToggleControl
                        label="Include Background Media"
                        onChange={onIncludeBackgroundMediaChange}
                        checked={isIncludeBackgroundMedia}
                    />

                    {
                        isIncludeBackgroundMedia && (
                            <MediaTypeControl
                                label="Background Media"
                                types={[ 'image', 'video' ]}
                                selectedType={backgroundMediaType}
                                onTypeChange={onBackgroundMediaTypeChange}
                                mediaId={media?.id}
                                mediaUrl={media?.url}
                                onMediaSelect={onMediaSelect}
                                onMediaRemove={onMediaRemove}
                            />
                        )
                    }

                    <Divider margin={2} />

                    <ToggleControl
                        label="Include Overlay"
                        onChange={onIncludeOverlayChange}
                        checked={isIncludeOverlay}
                    />

                    {
                        isIncludeOverlay && (
                            <ColorPaletteControl
                                label="Overlay Color"
                                value={overlayColor?.value}
                                attributeName="overlayColor"
                                setAttributes={setAttributes}
                                allowedColors={['white', 'gray-500', 'primary-700', 'secondary-700', 'tertiary-700']}
                            />
                        )
                    }

                    <Divider margin={2} />

                    <BaseControl>
                        <ToggleControl
                            label="Full Height"
                            onChange={onIsFullViewportHeightChange}
                            checked={isFullViewportHeight}
                        />
                    </BaseControl>

                </PanelBody>

                <PanelBody title="Spacing">
                    <ResponsiveSpacingControl
                        min={-1}
                        max={10}
                        onChange={onSpacingChange}
                        value={spacing}
                        deviceType={deviceType}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {
                    hasSelectedOverlayColor && (
                        <div
                            className={`absolute inset-0 bg-opacity-50 ${hasSelectedOverlayColor ? `bg-${overlayColor?.slug}` : ''}`}
                        />
                    )
                }

                {
                    isIncludeBackgroundMedia && (
                        <>
                            {
                                hasSelectedBackgroundImage && (
                                    <img
                                        src={media.url}
                                        alt={media?.alt || 'background image'}
                                        className="absolute inset-0 -z-10 !h-full !w-full object-cover"
                                    />
                                )
                            }

                            {
                                hasSelectedBackgroundVideo && (
                                    <video
                                        src={media.url}
                                        className="absolute inset-0 -z-10 !h-full !w-full object-cover"
                                        autoPlay
                                        playsInline
                                        muted
                                        loop
                                    />
                                )
                            }
                        </>
                    )
                }

                <div {...innerBlocksProps}>
                    {innerBlocksProps.children}

                    {
                        hasInnerBlocks
                            ? <InnerBlocks.DefaultBlockAppender />
                            : <EmptyBlockAppender title="This section is empty" />
                    }
                </div>
            </div>
        </>
    );
};
