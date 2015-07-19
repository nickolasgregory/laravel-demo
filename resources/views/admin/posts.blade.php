@extends('layouts.admin')

@section('content')

    <h2>Posts</h2>

    @if (session('status'))
    <div class="alert alert-success">{{ session('status') }}</div>
    @endif

    <a class="pure-button pure-button-primary" href="/admin/add">Add Post</a>

    <div class="pure-menu">
        <ul class="pure-menu-list">
    @foreach ($posts as $post)
            <li class="pure-menu-item">
                <a href="{{ url('admin') }}/post/{{ $post->id }}" class="pure-menu-link" style="padding: 1em;">
                    Edit Post "<strong>{{ $post->title }}</strong>" [Id:{{ $post->id }}]<br>
                    <small>{{ $post->author }}</small>
                </a>
            </li>
    @endforeach
        </ul>
    </div>

@endsection
