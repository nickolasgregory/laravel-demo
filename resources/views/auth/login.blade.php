@extends('layouts.admin')

@section('content')

    <form method="POST" action="" class="pure-form pure-form-stacked">

        {!! csrf_field() !!}

        <fieldset>
            <legend>Please Login</legend>

{{--
            <label for="email">Email</label>
            <input  id="email" name="email" type="email" placeholder="Email" value="nickolasgregory@gmail.com">
--}}

            <label for="name">Name</label>
            <input  id="name" name="name" placeholder="Name" autocomplete="off">

            <label for="password">Password</label>
            <input  id="password" name="password" type="password" placeholder="Password">

            <label for="remember" class="pure-checkbox">
                <input id="remember" type="checkbox"> Remember me
            </label>

            <button type="submit" class="pure-button pure-button-primary">Sign in</button>
        </fieldset>

    </form>

@endsection
