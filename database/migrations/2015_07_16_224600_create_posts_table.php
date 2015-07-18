<?php

// php artisan make:migration create_posts_table --create="posts"
/*
    --SELECT date('now');
    -- SELECT strftime('%s','now');
    INSERT INTO posts (id, title, body, author, created_at, updated_at) VALUES(NULL, "p1", "post 1", "Nick", strftime('%s','now'), strftime('%s','now'))
*/

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // TODO: if ! exists $table
        /**/
        Schema::create('posts', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('user_id');
            $table->string('title');
            $table->text('body');
            $table->timestamps();

        }); /**/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('posts');
    }

}
