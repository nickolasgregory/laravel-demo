@extends('layouts.admin')

@section('content')

    {{ session('status') }}

    <div class="pure-menu">
        <ul class="pure-menu-list">
            <li class="pure-menu-item">
                <a class="pure-button pure-button-primary" href="/admin/add">Add Post</a>
                <a class="pure-menu-link" href="/admin/posts">Edit Posts</a>
                <a class="pure-menu-link" href="">Edit Pages (NA)</a>
            </li>
        </ul>
    </div>

@endsection
