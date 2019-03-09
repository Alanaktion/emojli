<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Get the most recent posts
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::with('user')
            ->latest()
            ->simplePaginate(30);
    }

    /**
     * Get a single post
     *
     * @param Post $post
     * @return Post
     */
    public function show(Post $post)
    {
        $post->load('user');
        return $post;
    }

    /**
     * Create a post
     *
     * @param Request $request
     * @return Post
     */
    public function store(Request $request): Post
    {
        $post = Auth::user()->posts()->create($request->only('body'));
        $post->loadMissing('user');
        return $post;
    }
}
