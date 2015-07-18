<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'body', 'author'];

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function user()
    {
        return $this->hasMany('App\User');
    }

    /*
    $comments = App\Post::find(1)->comments;
    class Comment extends Model
    {
        public function post()
        {
            return $this->belongsTo('App\Post');
        }
    $comment = App\Comment::find(1); echo $comment->post->title;
    foreach ($post->comments as $comment) {
    */
}



// TODO: user_id
// TODO: future date posts

