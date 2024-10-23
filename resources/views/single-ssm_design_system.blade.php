@extends('layouts.app')

@section('content')
	
	<h1 class="relative text-center !my-16 !pb-0">{!! get_the_title() !!}</h1>

	{!! the_content() !!}

@endsection