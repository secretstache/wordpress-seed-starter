<?php

namespace App\Blocks;
use App\View\Composers\SSM;

class BlogFeed extends Block
{

    protected function prepareData(array $data): array
    {
        $query              = $data['attributes']['queryType'] ?? 'latest';
        $number_posts       = $data['attributes']['numberOfPosts'] ?? -1;
        $columns_per_row    = $data['attributes']['columnsPerRow'] ?? 3;

        $posts = SSM::getPosts( [
            'data_source'       => 'posts',
            'query'             => $query,
            'taxonomy_slug'     => 'category',
            'selected_terms'    => $data['attributes']['selectedCategories'] ?? [],
            'number_posts'      => $number_posts,
            'curated_posts'     => $data['attributes']['curatedPosts'] ?? [],
            'prefix'            => 'ssm'
        ]);

        $data = [
            'wrapper_attributes'    => get_block_wrapper_attributes(['class' => 'wp-block-ssm-testimonials']),
            'number_posts'          => $number_posts,
            'posts'                 => $posts,
            'layout'                => $data['attributes']['layoutType'] ?? 'block-grid',
            'show_featured_image'   => $data['attributes']['isShowFeaturedImage'] ?? true,
            'show_title'            => $data['attributes']['isShowTitle'] ?? true,
            'show_post_meta'        => $data['attributes']['isShowPostMeta'] ?? false,
            'columns_per_row'       => $columns_per_row,
        ];

        return $data;
    }

}
