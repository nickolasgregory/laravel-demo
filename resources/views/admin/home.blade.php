@extends('layouts.admin')

@section('content')

    <div class="pure-menu">
        <ul class="pure-menu-list">

            <li class="pure-menu-heading">Content</li>

            <li class="pure-menu-item">
                <a class="pure-menu-link" href="/admin/posts">Manage Posts</a>
            </li>

            <li class="pure-menu-item">
                <a class="pure-menu-link" href="">Manage Pages (NA)</a>
            </li>

            <li class="pure-menu-heading">System</li>
            <li class="pure-menu-separator"></li>

            <li class="pure-menu-item">
                <a class="pure-menu-link" href="">Manage Users (NA)</a>
            </li>
        </ul>
    </div>

@endsection
