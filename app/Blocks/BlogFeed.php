<?php

namespace App\Blocks;
use App\View\Composers\SSM;

class BlogFeed extends Block
{

    protected function prepareData($attributes, $content): array
    {
        $query                  = $attributes['queryType'] ?? 'latest';
        $number_posts           = $attributes['numberOfPosts'] ?? -1;
        $columns_per_row        = $attributes['columnsPerRow'] ?? 3;
        $layout                 = $attributes['layoutType'] ?? 'block-grid';
        $is_show_featured_image = $attributes['isShowFeaturedImage'] ?? true;
        $is_show_title          = $attributes['isShowTitle'] ?? true;
        $is_show_post_meta      = $attributes['isShowPostMeta'] ?? false;

        $posts = SSM::getPosts( [
            'data_source'       => 'posts',
            'query'             => $query,
            'taxonomy_slug'     => 'category',
            'selected_terms'    => $attributes['selectedCategories'] ?? [],
            'number_posts'      => $number_posts,
            'curated_posts'     => $attributes['curatedPosts'] ?? [],
            'prefix'            => 'ssm'
        ]);

        $data = [
            'wrapper_attributes'    => get_block_wrapper_attributes(['class' => 'wp-block-ssm-testimonials']),
            'number_posts'          => $number_posts,
            'posts'                 => $posts,
            'layout'                => $layout,
            'columns_per_row'       => $columns_per_row,
            'show_featured_image'   => $is_show_featured_image,
            'show_title'            => $is_show_title,
            'show_post_meta'        => $is_show_post_meta,
        ];

        return $data;
    }

}
