@foreach ($menu_items as $item)

    <li class="menu__item block border-b border-gray-200 py-2 {!! !empty( $item->children ) ? ' relative menu-item-has-children' : '' !!}{!! $item->classes ? ' ' . $item->classes : '' !!}">

        <a class="text-sm uppercase leading-6 text-gray-900" href="{!! $item->url !!}">{!! $item->label !!}</a>

        @if ( !empty( $item->children ) )

            <span class="dropdown-arrow">
                <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
            </span>

            <div class="mega-menu max-h-0 box-border overflow-hidden pl-4 transition duration-[var(--tr)]">

                <ul class="mega-menu__navigation flex flex-col py-3">

                    @foreach ($item->children as $child)

                        <li class="mega-menu__navigation-item {!! !empty( $child->children ) ? ' menu-item-has-children' : '' !!}{!! $child->classes ? ' ' . $child->classes : '' !!}">

                            <a class="block transition py-3 ease-in-out text-sm text-gray-500 hover:text-primary-500" href="{!! $child->url !!}">

                                <p class="menu__item-title">{!! $child->label !!}</p>

                            </a>

                            @if ( !empty( $child->children ) )

                                <span class="dropdown-arrow">
                                    <svg class="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                </span>

                                <div class="mega-menu__sub-menu max-h-0 box-border overflow-hidden">

                                    <ul class="menu flex flex-col space-y-1.5 list-none py-3 pl-4 border-y border-gray-200">

                                        @foreach ($child->children as $subchild)

                                            <li class="mega-menu__sub-menu-item">

                                                <a class="transition ease-in-out text-sm text-gray-900 hover:text-primary-500" href="{!! $subchild->url !!}">

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

        @endif

    </li>

@endforeach