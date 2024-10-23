<div class="offcanvas hidden z-[1046] fixed top-0 right-0 left-0" role="dialog" aria-modal="true" id="offcanvas">
    
    <div class="fixed inset-y-0 top-0 z-10 w-full h-full overflow-y-auto bg-white py-4 sm:ring-1 sm:ring-gray-900/10">
        
        <div class="container flex items-center justify-between">

            @if ( ( $brand_logo = $logo_assets['brand_logo'] ) && $brand_logo['url'] )

                <div class="flex lg:flex-1">
                
                    <a href="{!! home_url() !!}" class="-m-1.5 p-1.5">
                    
                        <span class="sr-only">{!! get_bloginfo('name') !!}</span>
                    
                        <img class="h-12 w-auto" src="{!! $brand_logo['url'] !!}" alt="{!! $brand_logo['alt'] ?: get_bloginfo('name') !!}">
                    
                    </a>

                </div>

            @endif
            
            <button type="button" class="-mr-2.5 rounded-md p-2.5 text-gray-700" data-dismiss="offcanvas" >
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

        </div>

        <div class="container mt-6 flow-root">
            
            <div class="-my-6 divide-y divide-gray-500/10">
            
                @if ( has_nav_menu('primary_navigation') )

                    <nav class="offcanvas__navigation">

                        <ul class="offcanvas__menu flex flex-col list-none py-6">

                            @include( 'partials.offcanvas-navigation', ['menu_items' => $navigation['primary'] ] )

                        </ul>

                    </nav>

                @endif
            
            </div>
        
        </div>

    </div>
  
</div>
