@if ( $location_id )

    @if ( $geolocation = get_field( 'location_geolocation', $location_id ) )
        <p><b>Address: </b> {!! $geolocation['address'] !!}</p>
    @endif

    @if ( $phone = get_field( 'location_phone_number', $location_id ) )
        <p><b>Phone: </b> <a href="tel:{!! $phone['number'] !!}" class="no-underline text-primary-500 hover:underline">{!! $builder->getPhoneNumber( $phone ) !!}</a></p>
    @endif

    @if ( $director = get_field( 'location_director', $location_id ) )
        <p><b>Director: </b>{!! $director !!}</p>
    @endif

    @if ( $programs = get_field( 'location_related_programs', $location_id ) )

        <p>
            <b>Programs: </b>

            @foreach ($programs as $key => $program_id)
                <a href="{!! get_permalink( $program_id ) !!}" class="no-underline text-primary-500 hover:underline">{!! $key === array_key_last( $programs ) ? get_the_title( $program_id ) : get_the_title( $program_id ) . ', ' !!}</a>
            @endforeach

        </p>

    @endif

    @if ( $geolocation )

        <div class="wp-block-button is-style-primary-outline mt-5">
            <a href="https://maps.google.com/?q={!! urlencode( $geolocation['address'] ) !!}" target="_blank" class="wp-block-button__link wp-element-button">Get Directions</a>
        </div>

    @endif

@endif
