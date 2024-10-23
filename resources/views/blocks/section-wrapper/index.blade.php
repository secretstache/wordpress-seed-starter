<div {!! $wrapperAttributes !!}>

    @if ( $overlayColorClass )
        <div class="absolute inset-0 bg-opacity-50 {!! $overlayColorClass !!}"></div>
    @endif

    @if ( $backgroundMedia )

        @if ( $backgroundMedia['type'] === 'image' && $backgroundMedia['url'] )
            <img
                src="{!!$backgroundMedia['url'] !!}"
                alt="{!! $backgroundMedia['alt'] !!}"
                class="absolute inset-0 -z-10 !h-full !w-full object-cover"
            />
        @endif

        @if ( $backgroundMedia['type'] === 'video' && $backgroundMedia['url'] )
            <video
                src="{!!$backgroundMedia['url'] !!}"
                class="absolute inset-0 -z-10 !h-full !w-full object-cover"
                autoPlay
                playsInline
                muted
                loop
            ></video>
        @endif

        @if ( $backgroundMedia['type'] === 'animation' && $backgroundMedia['url'] )

            @if ( str_ends_with($backgroundAnimationUrl, '.json') )
                <lottie-player mode="normal" src="{!! $backgroundMedia['url'] !!}"{!! $backgroundMedia['isLooped'] ? ' loop' : '' !!}></lottie-player>
            @elseif ( str_ends_with($backgroundAnimationUrl, '.lottie') )
                <dotlottie-player mode="normal" src="{!! $backgroundMedia['url'] !!}"{!! $backgroundMedia['isLooped'] ? ' loop' : '' !!}></dotlottie-player>
            @endif

        @endif

    @endif

    <div class="wp-block-ssm-section-wrapper__content relative container mx-auto z-10">

        {!! $content !!}

    </div>

</div>
