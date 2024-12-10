<header class="site-header bg-white shadow-lg border-b border-solid border-gray-200 w-full z-[1045]">

	<nav class="container flex items-center justify-between py-4" aria-label="Global">

		@if ( ( $brand_logo = $logo_assets['brand_logo'] ) && $brand_logo['url'] )

			<div class="flex lg:flex-1">

				<a href="{!! home_url() !!}" class="-m-1.5 p-1.5">

					<span class="sr-only">{!! get_bloginfo('name') !!}</span>

					<img class="h-auto w-full max-w-64 max-h-14" src="{!! $brand_logo['url'] !!}" alt="{!! $brand_logo['alt'] ?: get_bloginfo('name') !!}">

				</a>

			</div>

		@endif

		<div class="flex flex-col justify-center lg:space-y-4">

			<div class="hidden lg:flex lg:gap-x-8 justify-end">

				@if ( has_nav_menu('top_navigation') )

					<ul class="menu list-none hidden lg:flex lg:gap-x-8 justify-end">

						@foreach ( $navigation['top'] as $key => $item )

							<li class="menu__item{!! $item->classes ? ' ' . $item->classes : '' !!}">

								<a class="text-sm leading-6 text-gray-700 hover:text-gray-400 transition-colors duration-300" target="{!! $item->target ?: '_self' !!}" href="{!! $item->url !!}">{!! $item->label !!}</a>
								
							</li>

						@endforeach

					</ul>

				@endif

				@if ( !empty( $business_information['phone_number'] ) )

					<a class="text-sm font-semibold leading-6 text-primary-500" href="tel:{!! $business_information['phone_number']['number'] !!}">{!! $builder->getPhoneNumber( $business_information['phone_number'] ) !!}</a>

				@endif

			</div>

			@if ( has_nav_menu('primary_navigation') )

				<div class="flex lg:hidden">

					@include( 'partials.hamburger' )

				</div>

				<div class="hidden lg:flex">

					<ul class="menu is-dropdown list-none flex lg:gap-x-8 justify-end">

						@include( 'partials.navigation', ['menu_items' => $navigation['primary'] ] )

					</ul>

				</div>

			@endif

		</div>

	</nav>

</header>
