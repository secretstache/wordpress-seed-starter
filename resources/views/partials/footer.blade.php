<footer class="site-footer" aria-labelledby="footer-heading">

	<h2 id="footer-heading" class="sr-only">Footer</h2>

	@if( ! empty( $social_networks ) )

		<div class="site-footer-social-media bg-white border-t-[1px] border-gray-500">

			<div class="container py-8 flex flex-col items-center space-y-4">

				<h3 class="text-xl font-semibold leading-6 mb-3">Connect With Us</h3>

				<div class="flex space-x-6 items-center">

					@if ( $facebook = $social_networks['facebook'] )

						<a href="{!! $facebook !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300">
							<span class="sr-only">Facebook</span>
							<img class="editable-svg" src="@asset('images/facebook-icon.svg')" alt="Facebook">
						</a>

					@endif

					@if ( $instagram = $social_networks['instagram'] )

						<a href="{!! $instagram !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300">
							<span class="sr-only">Instagram</span>
							<img class="editable-svg" src="@asset('images/instagram-icon.svg')" alt="Instagram">
						</a>

					@endif

					@if ( $twitter = $social_networks['twitter'] )

						<a href="{!! $twitter !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300">
							<span class="sr-only">Twitter</span>
							<img class="editable-svg" src="@asset('images/twitter-icon.svg')" alt="Twitter">
						</a>

					@endif

					@if ( $youtube = $social_networks['youtube'] )

						<a href="{!! $youtube !!}"  target="_blank" class="text-gray-500 hover:text-gray-400 transition-all duration-300">
							<span class="sr-only">YouTube</span>
							<img class="editable-svg" src="@asset('images/youtube-icon.svg')" alt="YouTube">
						</a>

					@endif

				</div>

			</div>

		</div>

	@endif

	<div class="site-footer-main bg-primary-500">

		<div class="container py-10">

			@if ( is_array( $navigation['footer'] ) && !empty( $navigation['footer'] ) )

				<div class="mt-16 grid grid-cols-2 md:grid-cols-{!! count( $navigation['footer'] ) + 1 ?? 5 !!} gap-8 xl:col-span-2 xl:mt-0">

					@foreach ( $navigation['footer'] as $key => $footer_menu )

						<div>

							@if( $footer_menu['headline'] )

								@if ( $footer_menu['page_id'] )
									<a href="{!! get_permalink( $footer_menu['page_id'] ) !!}">
								@endif

									<h4 class="text-xl font-semibold leading-6 text-white hover:text-secondary-500 transition-colors duration-300">{!! $footer_menu['headline'] !!}</h4>

								@if ( $footer_menu['page_id'] )
									</a>
								@endif

							@endif

							@if( is_array( $footer_menu['nav_menu'] ) && !empty( $footer_menu['nav_menu'] ) )

								<ul role="list" class="mt-2.5">

									@foreach ( $footer_menu['nav_menu'] as $item )

										<li class="{!! $item->classes ? ' ' . $item->classes : '' !!}">
											<a href="{!! $item->url !!}" class="pointer-events-auto text-sm leading-7 text-white hover:text-secondary-300 transition-colors duration-300">{!! $item->label !!}</a>
										</li>

									@endforeach

								</ul>

							@endif

						</div>

					@endforeach

					<div>

						@if ( $footer['contact_page_id'] )

							<a href="{!! get_permalink( $footer['contact_page_id'] ) !!}">
								<h4 class="text-xl font-semibold leading-6 text-white hover:text-secondary-500 text-xl font-semibold leading-6 text-white hover:text-secondary-500 transition-colors duration-300">{!! get_the_title( $footer['contact_page_id'] ) !!}</h4>
							</a>

						@endif

						<p class="text-sm font-semibold text-white mt-2.5">Main Headquarters</p>

						@if ( $phone_number = $business_information['phone_number'] )

							<p class="text-sm font-semibold text-white mt-2.5">Phone:</p>

							<a href="tel:{!! $phone_number['number'] !!}" class="text-sm text-white hover:text-secondary-300 transition-colors duration-300">{!! $builder->getPhoneNumber( $phone_number ) !!}</a>

						@endif

						@if ( $email_address = $business_information['email_address'] )

							<p class="text-sm font-semibold text-white mt-2.5">Email:</p>

							<a href="mailto:{!! $email_address !!}" class="text-sm text-white hover:text-secondary-300 transition-colors duration-300">{!! $email_address !!}</a>

						@endif

					</div>

				</div>

			@endif

		</div>

	</div>

	@if ( $footer['copyright'] )

		<div class="site-footer-copyright bg-gray-100 py-2.5 flex items-center justify-center space-x-1 text-gray-900 text-xs leading-5">

			<span>{!! $footer['copyright'] !!}</span>

		</div>

	@endif

</footer>
