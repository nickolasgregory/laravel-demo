@extends('layouts.admin')

@section('content')

    <form method="POST" action="/auth/register" class="pure-form pure-form-stacked">

        {!! csrf_field() !!}


        <fieldset>
            <legend>Please Register</legend>

            <label for="email">Email</label>
            <input  id="email" name="email" type="email" placeholder="Email">

            <label for="name">Name</label>
            <input  id="name" name="name" placeholder="Name" value="nick">

            <label for="password">Password</label>
            <input  id="password" name="password" type="password" placeholder="Password">

            <label for="password_confirmation">Confirm Password</label>
            <input  id="password_confirmation" name="password_confirmation" type="password" placeholder="Confirm Password">

            <button type="submit" class="pure-button pure-button-primary">Register</button>
    </form>

@endsection
