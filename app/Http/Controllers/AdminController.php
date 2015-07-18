<?php

namespace App\Http\Controllers;

/**
 *
 */
class AdminController extends Controller
{

    /**
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Admin "Home"
     *
     * @return Response
     */
    public function getIndex()
    {
        return view('admin.home');
    }

    /**
     * Display a listing of Posts
     *
     * @return Response
     */
    public function getPosts()
    {
        $posts = \App\Post::all(); // TODO: pagination  Post::skip(10)->take(1)->get();
        return view('admin.posts', [
            'posts' => $posts,
        ]);
    }


    /**
     *
     *
     * @param int $id
     * @return \Illuminate\View\View
     */
    public function getPost($id = null)
    {
        if ( ! $id ) {
            return view('admin.post-not-found');
        }

        $post = \App\Post::find($id);
        if ( ! $post ) {
            return view('admin.post-not-found');
        }

        return view('admin.edit', [
            'post' => $post,
            'users' => \App\User::all(),
            'selected_user' => $post->user_id,
        ]);
    }


    /**
     * Update a Post
     *
     * @param mixed $id
     * @return {\Illuminate\Http\RedirectResponse|\Illuminate\Http\RedirectResponse|\Illuminate\Http\RedirectResponse}
     */
    public function postPost($id)
    {
        $data = \Input::all();
        $post = \App\Post::find($id);
        $post->update($data);

        return redirect('admin/posts')
            ->with('status', "Post $id Updated");
    }


    /**
     *
     *
     */
    public function postIndex()
    {
        return view('admin.post-not-found');
    }


    // TODO: should be in the AdminPostsController
    /**
     *
     */
    public function postAdd()
    {
        $data = \Input::all();
        $post = new \App\Post($data);
        $post->save();#$data);

        return redirect('admin/posts')
            ->with('status', "Post {$post->id} Added");
    }


    /**
     *
     */
    public function getAdd()
    {
        $post = new \App\Post();

        return view('admin.edit', [
            'post' => $post,
        ]);
    }

}
