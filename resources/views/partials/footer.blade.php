<footer class="site-footer" aria-labelledby="footer-heading">

	<h2 id="footer-heading" class="sr-only">Footer</h2>

	<div class="site-footer-main bg-primary-500">

		<div class="container py-10">

			@if ( !empty( $navigation['footer'] ) && is_array( $navigation['footer'] ) )

				<div class="mt-16 grid grid-cols-2 md:grid-cols-{!! count( $navigation['footer'] ) + 1 ?? 5 !!} gap-8 xl:col-span-2 xl:mt-0">

					@foreach ( $navigation['footer'] as $key => $footer_menu )

						@if( !empty( $footer_menu['nav_menu'] ) && is_array( $footer_menu['nav_menu'] ) )

							<div>

								<ul role="list" class="mt-2.5">

									@foreach ( $footer_menu['nav_menu'] as $item )

										<li class="{!! $item->classes ? ' ' . $item->classes : '' !!}">
											<a target="{!! $item->target ?? "_slef" !!}" href="{!! $item->url !!}" class="pointer-events-auto text-sm leading-7 text-white hover:text-secondary-300 transition-colors duration-300">{!! $item->label !!}</a>
										</li>

									@endforeach

								</ul>

							</div>

						@endif

					@endforeach

					@if ( $business_information['phone_number'] || $business_information['email_address'] )

						<div>

							<p class="text-sm font-semibold text-white mt-2.5">Contact Information</p>

							@if ( $business_information['phone_number'] )

								<p class="text-sm font-semibold text-white mt-2.5">Phone:</p>

								<a href="tel:{!! $business_information['phone_number']['number'] !!}" class="text-sm text-white hover:text-secondary-300 transition-colors duration-300">{!! $builder->getPhoneNumber( $business_information['phone_number'] ) !!}</a>

							@endif

							@if ( $business_information['email_address'] )

								<p class="text-sm font-semibold text-white mt-2.5">Email:</p>

								<a href="mailto:{!! $business_information['email_address'] !!}" class="text-sm text-white hover:text-secondary-300 transition-colors duration-300">{!! $business_information['email_address'] !!}</a>

							@endif

						</div>

					@endif

				</div>

			@endif

		</div>

	</div>

	<div class="site-footer-copyright container py-2.5 flex items-center justify-between space-x-1 text-gray-900 text-xs leading-5 border-gray-500">

		@if ( $footer['copyright'] )
			<span>{!! $footer['copyright'] !!}</span>
		@endif

		@if( !empty( $social_networks ) )

			<div class="site-footer-social-media">

				<div class="flex space-x-6 items-center">

					@if ( $facebook = $social_networks['facebook'] )
						<a href="{!! $facebook !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300"><span class="sr-only">Facebook</span><img class="editable-svg" src="@asset('images/facebook-icon.svg')" alt="Facebook"></a>
					@endif

					@if ( $instagram = $social_networks['instagram'] )
						<a href="{!! $instagram !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300"><span class="sr-only">Instagram</span><img class="editable-svg" src="@asset('images/instagram-icon.svg')" alt="Instagram"></a>
					@endif

					@if ( $twitter = $social_networks['twitter'] )
						<a href="{!! $twitter !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300"><span class="sr-only">Twitter</span><img class="editable-svg" src="@asset('images/twitter-icon.svg')" alt="Twitter"></a>
					@endif

					@if ( $youtube = $social_networks['youtube'] )
						<a href="{!! $youtube !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300"><span class="sr-only">YouTube</span><img class="editable-svg" src="@asset('images/youtube-icon.svg')" alt="YouTube"></a>
					@endif

				</div>

			</div>

		@endif

	</div>

</footer>
