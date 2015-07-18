<?php

namespace App\Http\Controllers;

/**
 *
 */
class ApiController extends Controller
{

    /**
     * current URL for convenience
     * @var mixed
     */
    protected $host;


    /**
     *
     *
     */
    public function __construct()
    {
        $this->host = (@$_SERVER['HTTPS'] ?: 'http:').'//'.$_SERVER['HTTP_HOST'];
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getIndex()
    {
        $json = [
            'posts' => $this->host.'/api/posts',
        ];

        return response()->json($json);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getPosts()
    {
        return response()->json(\App\Post::all());
    }

    public function getPost($id)
    {
        return response()->json(\App\Post::find($id));
    }

}

//    public function showProfile($id)
//    {
//        return view('user.profile', ['user' => User::findOrFail($id)]);
//    }
