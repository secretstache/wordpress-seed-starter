@extends('layouts.app')

@section('content')

    @if (! have_posts())
        {!! get_search_form(false) !!}
    @endif

    @while(have_posts()) @php(the_post())

        {!! the_title() !!}
        
    @endwhile

    {!! get_the_posts_navigation() !!}

@endsection
