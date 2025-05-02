@foreach ($menu_items as $key => $item)

    <li class="menu__item flex items-center gap-x-1{!! !empty( $item->children ) ? ' relative menu-item-has-children' : '' !!}{!! $item->classes ? ' ' . $item->classes : '' !!}">

        <a target="{!! $item->target ?: '_self' !!}" class="text-sm uppercase leading-6 text-gray-900 hover:text-primary-600 transition-colors duration-300 no-underline" href="{!! $item->url !!}">{!! $item->label !!}</a>

        @if ( !empty( $item->children ) )

            <div class="submenu-wrapper invisible opacity-0 transition-opacity duration-[var(--tr)] absolute right-0 top-full z-10 mt-4 w-screen max-w-xs overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 z-[1000]">

                <div class="py-4">

                    <ul class="menu flex flex-col space-y-3">

                        @foreach ($item->children as $child)

                            <li class="menu__item{!! !empty( $child->children ) ? ' menu-item-has-children flex flex-col items-start' : '' !!}{!! $child->classes ? ' ' . $child->classes : '' !!}">

                                <a class="block w-full px-4 py-1.5 transition ease-in-out text-sm text-gray-900 hover:bg-gray-200" target="{!! $child->target ?: '_self' !!}" href="{!! $child->url !!}">

                                    <p class="menu__item-title">{!! $child->label !!}</p>

                                </a>

                                @if ( !empty( $child->children ) )

                                    <div class="submenu-wrapper-level-3 pl-8 w-full border-y border-gray-200">

                                        <ul class="menu flex flex-col py-3 space-y-3 list-none w-full">

                                            @foreach ($child->children as $subchild)

                                                <li {!! !empty( $subchild->classes ) ? 'class="'. $subchild->classes .'"' : '' !!}>

                                                    <a class="transition ease-in-out text-sm text-gray-900 hover:text-primary-500" target="{!! $subchild->target ?: '_self' !!}" href="{!! $subchild->url !!}">

                                                        <p class="menu__item-title">{!! $subchild->label !!}</p>

                                                    </a>

                                                </li>

                                            @endforeach

                                        </ul>

                                    </div>

                                @endif

                            </li>

                        @endforeach

                    </ul>

                </div>

            </div>

        @endif

    </li>

@endforeach
