@extends('layouts.admin')

@section('content')

    <h3><a href="{{ url('admin') }}/posts">Posts</a></h3>

    <form method="POST" action="" class="pure-form pure-form-stacked">

        {!! csrf_field() !!}

        <fieldset>
            <legend>Editing Post Id: <em>{{ $post->id }}</em></legend>

            <label for="title">Title</label>
            <input id="title" name="title" placeholder="Title" value="{{ $post->title }}" class="pure-u-1">

            <select name="user_id">
            @foreach ($users as $user)
                <option value="{{ $user->id }}"{{ ($user->id == $selected_user) ? 'selected="sselected"' : ''  }}>{{ $user->name }}</option>
            @endforeach
            </select>

            <label for="body">Body</label>
            <textarea id="body" name="body" class="pure-u-1">{{ $post->body }}</textarea>

            <button type="submit" class="pure-button pure-button-primary">Save</button>

            @if ($post->id)
            <label for="confirm_delete"><input type="checkbox" value="1" name="confirm_delete" id="confirm_delete" onclick="return confirm('Are you sure?');"> Delete this Post</label>
            @endif

        </fieldset>

    </form>

@endsection
