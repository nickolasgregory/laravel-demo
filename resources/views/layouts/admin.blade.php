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

    <a href="{{ url('') }}">Home</a> <a href="{{ url('auth/logout') }}">logout</a>
</div><!-- #layout -->
</body>
</html>