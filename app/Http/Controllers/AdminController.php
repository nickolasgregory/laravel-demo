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
        $posts = \App\Post::orderBy('updated_at', 'desc')->get();
        // TODO: pagination  Post::skip(10)->take(1)->get();

        return view('admin.posts', [
            'posts' => $posts,
        ]);
    }


    /**
     *  View Add Post
     */
    public function getAdd()
    {
        $post = new \App\Post();

        return view('admin.edit', [
            'post' => $post,
            'users' => \App\User::all(),
            'selected_user' => \Auth::user()->id,
        ]);
    }


    /**
     *  Add a Post
     */
    public function postAdd()
    {
        $data = \Input::all();

        $post = new \App\Post($data);
        // TODO: validation

        $post->save();

        return redirect('admin/posts')
            ->with('status', "Post {$post->id} Added");
    }


    /**
     *  Retrieve a Post
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

        // get Post
        $post = \App\Post::find($id);
        if ( ! $post ) {
            return redirect('admin/posts')
                ->with('status', "Post $id Not Found");
        }

        // Delete if required
        if ( ! empty($data['confirm_delete'])) {
            // TODO: setting a 'deleted_at' field would be better
            $post->delete();
            return redirect('admin/posts')
                ->with('status', "Post $id Deleted");
        }

        // Update Post
        $post->update($data);
        return redirect('admin/posts')
            ->with('status', "Post $id Updated");
    }


    /**
     *  Add a Comment
     *
     */
    public function postComment()
    {
        $data = \Input::all();

        // Check Post exists
        if (empty($data['post_id'])) {
            return response()->json([
                'status' => 404,
                'error'  => "Post not Found"
            ], 404);
        }

        $post = \App\Post::find($data['post_id']);
        if ( ! $post) {
            return response()->json([
                'status' => 404,
                'error'  => "Post not Found"
            ], 404);
        }

        // Build Comment record
        $comment = new \App\Comment([
            'post_id' => $post->id,
            'user_id' => \Auth::user()->id,
            'body' => $data['comment_body'],
        ]);

        if ($comment->save()) {
            return response()->json([
                'status' => 200,
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'error'  => "Saved Failed"
            ], 500);
        }
    }


    /**
     *
     *
     */
    public function getComment()
    {
        return redirect('admin');
    }

}
