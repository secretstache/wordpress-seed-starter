@php
    /**
    * @var $wrapper_attributes
    * @var $posts
    */
@endphp

<div {!! $wrapper_attributes !!}>

    @if( ! empty( $posts ) && $number_posts != 0 )

        <div class="blog-feed__list {!! $layout == 'block-grid' ? 'mx-auto mt-16 grid max-w-2xl gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-' . ( $columns_per_row ?? 3 ) : 'mt-16 space-y-20 lg:mt-20 lg:space-y-20' !!}">

            @foreach( $posts as $post_id )

                @php
                    $categories         = get_the_category($post_id);
                    $author_id          = get_post_field( 'post_author', $post_id );
                    $author_name        = get_the_author_meta( 'display_name', $author_id );
                    $author_avatar_url  = get_avatar_url( $author_id );

                @endphp

                <a href="{!! get_permalink($post_id) !!}" class="blog-feed__item flex flex-col {!! $layout == 'block-grid' ? 'items-start justify-between': 'relative isolate gap-8 lg:flex-row' !!}">

                    @if( has_post_thumbnail( $post_id ) && $show_featured_image )

                        <div class="blog-feed__img-wrapper relative overflow-hidden {!! $layout == 'block-grid' ? 'w-full aspect-[16/9] rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2]' : 'aspect-[16/9] rounded-2xl sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0' !!}">

                            {!!
                                ipq_get_theme_image( get_post_thumbnail_id( $post_id ),
                                    [ [ 480, 320, true ], [ 960, 640, true ], [ 1920, 1280, true ] ],
                                    [
                                        'class' => 'blog-feed-image object-cover inline-block align-middle max-w-full w-full !h-full',
                                        'alt'   => get_the_title( $post_id ),
                                    ]
                                );
                            !!}

                            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                        </div>

                    @endif

                    <div class="blog-feed__content max-w-xl">

                        @if( $show_post_meta )

                            <div class="{!! $layout == 'block-grid' ? 'mt-8 ' : '' !!}flex items-center gap-x-4 text-xs">

                                <time datetime="{!! get_the_date( 'Y-m-d', $post_id ) !!}" class="text-gray-500">{!! get_the_date( 'M j, Y', $post_id ) !!}</time>

                                @if( $categories )

                                    <span class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{!! $categories[0]->name !!}</span>

                                @endif

                            </div>

                        @endif

                        <div class="{!! ( $show_post_meta || $layout != 'block-grid' ) ? '' : 'mt-8 ' !!}group relative">

                            @if( $show_title )

                                <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">{!! get_the_title( $post_id ) !!}</h3>

                            @endif

                            @if( ! empty( get_the_excerpt( $post_id ) ) )

                                <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{!! wp_trim_words( get_the_excerpt( $post_id ), 30 )  !!}</p>

                            @endif

                        </div>

                        @if( $show_post_meta && $author_name )

                            <div class="{!! 'relative mt-8 flex items-center gap-x-4' . ( $layout == 'block-grid' ? '' : ' border-t border-gray-900/5 pt-6' ) !!}">

                                @if( $author_avatar_url )

                                    <img src="{!! $author_avatar_url !!}" alt="{!! $author_name !!}" class="h-10 w-10 rounded-full bg-gray-100">

                                @endif

                                <div class="text-sm leading-6">

                                    <p class="font-semibold text-gray-900"><span class="absolute inset-0"></span>{!! $author_name !!}</p>

                                </div>

                            </div>

                        @endif

                    </div>

                </a>

            @endforeach

        </div>

    @else

        <p>No resources were found.</p>

    @endif

</div>
