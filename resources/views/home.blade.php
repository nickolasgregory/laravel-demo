<!DOCTYPE html>
<html>
<head>

    <title>iswym</title>

<link href='http://fonts.googleapis.com/css?family=Nunito' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="/assets/css/base.css">
<link rel="stylesheet" type="text/css" href="/assets/css/blog.css">
</head>
<body>
    <div id="app">
        <div class="loading">
            <span>Loading</span>
            <div id="loading-progress-text">all the things...</div>
        </div>
    </div>
<script src="/assets/js/mithril.js"></script>
<script src="/assets/js/components.js"></script>
<script src="/assets/js/blog.js"></script>
<script>

var APP = {
    login: {{ Auth::check() ? 'true' : 'false' }},
    csrf: '{!! csrf_token() !!}'
}

m.route(document.getElementById('app'), '/', {
    '/': viewPage,
    '/:page': viewPage,
    '/post/:id': viewPost
})
</script>
</body>
</html>