@extends('layouts.admin')

@section('content')

    <h2>Posts</h2>

    <div class="pure-menu">
        <ul class="pure-menu-list">
    @foreach ($posts as $post)

            <li class="pure-menu-item">
                <a href="{{ url('admin') }}/post/{{ $post->id }}" class="pure-menu-link" style="padding: 1em;">
                    edit Post "{{ $post->title }}" [{{ $post->id }}]<br>
                    <small>{{ $post->author }}</small>
                </a>
            </li>
    @endforeach
        </ul>
    </div>

@endsection
