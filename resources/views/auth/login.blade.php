@extends('layouts.admin')

@section('content')

    <form method="POST" action="" class="pure-form pure-form-stacked">

        {!! csrf_field() !!}

        <fieldset>
            <legend>Please Login</legend>

            @if (Auth::check())
            <p>You are already logged in as <em>{!! Auth::user()['name'] !!}</em></p>
            @endif

            <label for="name">Name</label>
            <input  id="name" name="name" placeholder="Name" autocomplete="off" class="pure-u-1">

            <label for="password">Password</label>
            <input  id="password" name="password" type="password" placeholder="Password" class="pure-u-1">

            <label for="remember" class="pure-checkbox">
                <input id="remember" type="checkbox"> Remember me
            </label>

            <button type="submit" class="pure-button pure-button-primary">Sign in</button>
        </fieldset>

    </form>

@endsection
