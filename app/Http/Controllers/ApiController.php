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
     * Get a list of Posts
     *
     * @return Response
     */
    public function getPosts()
    {
        return response()->json(\App\Post::orderBy('updated_at', 'desc')->get());
    }


    /**
     * Get the Post
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPost($id)
    {
        $post = \App\Post::find($id);
        if ( ! $post) {
            return response()->json([
                'status' => 404,
                'error'  => "Post not Found"
            ], 404);
        }

        // Lazy eager load
        $post->load(['user', 'comments']);
        $post->comments->load('user'); // nice :)

        $converter = new \Parsedown();
        $post->html = $converter->parse($post->body);

        return response()->json($post);
    }

}
