<!DOCTYPE html>
<html>
<head>

    <title>Admin - iswym</title>

<link rel="stylesheet" type="text/css" href="/assets/css/base.css">
<link rel="stylesheet" type="text/css" href="/assets/css/blog-admin.css">
</head>
<body class="admin">
<div id="layout">

    <h1><a href="{{ url('admin') }}">Admin</a></h1>

    @yield('content')

    <hr>

    <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
            <li class="pure-menu-item"><a href="{{ url('') }}" class="pure-menu-link">Return to Site</a></li>
            <li class="pure-menu-item"><a href="{{ url('auth/logout') }}" class="pure-menu-link pure-menu-link-logout">Logout</a></li>
        </ul>
    </div>

</div><!-- #layout -->
</body>
</html>