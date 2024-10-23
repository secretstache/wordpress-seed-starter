@extends('layouts.app')

@section('content')

    <div class="relative container w-full max-w-5xl z-10 py-16">

        <h2 class="text-4xl mb-5 font-semibold leading-7 tracking-tight">{!! $name !!}</h2>

        @if ( $job_title )
            
            <p class="text-lg">{!! $location ? $job_title . ' - ' . $location : $job_title !!}</p>

        @endif

        @if ( $headshot && $headshot['url'] )
            <img src="{!! $headshot['url'] !!}" alt="{!! $name !!}" class="mt-5 max-w-md">
        @endif

        @if ( $bio )
            <div class="mt-5 text-lg bio">{!! $bio !!}</div>
        @endif
        
    </div>

@endsection