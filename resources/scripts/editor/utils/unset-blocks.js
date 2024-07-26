import {
    getBlockType,
    getBlockVariations,
    unregisterBlockType,
    unregisterBlockVariation,
} from '@wordpress/blocks';

export const unsetBlocks = () => {

    // unset unnecessary embed blocks
    getBlockVariations("core/embed")
        .forEach(function (embed) {
            if (embed.name !== "youtube" && embed.name !== "vimeo") {
                unregisterBlockVariation("core/embed", embed.name);
            }
        });

    // unregister unnecessary blocks
    const unsetBlocks = [
        //core
        "core/quote",
        "core/audio",
        'core/freeform',
        'core/preformatted',
        "core/verse",
        "core/archives",
        "core/calendar",
        "core/categories",
        "core/latest-comments",
        "core/latest-posts",
        "core/page-list",
        "core/page-list-item",
        "core/rss",
        "core/search",
        "core/social-links",
        "core/tag-cloud",
        "core/navigation",
        "core/navigation-link",
        "core/navigation-submenu",
        "core/site-logo",
        "core/site-title",
        "core/site-tagline",
        "core/query",
        "core/avatar",
        "core/post-excerpt",
        "core/post-template",
        "core/post-content",
        "core/post-author",
        "core/post-navigation-link",
        "core/query-pagination",
        "core/query-pagination-next",
        "core/query-pagination-numbers",
        "core/query-pagination-previous",
        "core/query-no-results",
        "core/read-more",
        "core/comments",
        "core/comment-author-name",
        "core/comment-content",
        "core/comment-date",
        "core/comment-edit-link",
        "core/comment-reply-link",
        "core/comments-title",
        "core/comments-pagination",
        "core/comments-pagination-next",
        "core/comments-pagination-numbers",
        "core/comments-pagination-previous",
        "core/post-comments-form",
        "core/loginout",
        "core/term-description",
        "core/query-title",
        "core/post-author-biography",
        'core/post-title',
        'core/post-featured-image',
        'core/post-author-name',
        'core/post-date',
        'core/post-terms',
        "core/stack",
        "core/more",
        "core/nextpage",
        "core/comment-template",
        "core/home-link",
        'core/spacer',
        'core/media-text',
        'core/group',
        "core/gallery",
        'core/file',
        'core/missing',
        'core/pattern',
        'core/block',
        'core/text-columns',
        'core/footnotes',
        'core/template-part',
        'core/legacy-widget',
        'core/widget-group',
        'core/code',
        //third-party
        'real-media-library/gallery',
        'searchwp/search-form',
        //yoast seo
        "yoast-seo/breadcrumbs",
        "yoast/how-to-block",
        "yoast/faq-block",
        //save svg
        "safe-svg/svg-icon",
    ];

    unsetBlocks.forEach(function (blockName) {
        if (getBlockType(blockName)) {
            unregisterBlockType(blockName);
        }
    });

};
