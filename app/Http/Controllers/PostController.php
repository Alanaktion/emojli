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
     * If authenticated, this is limited to posts by users the user is following
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Auth::check()) {
            return Post::with('user')
                ->latest()
                ->simplePaginate(30);
        }

        $userIds = Auth::user()->following->pluck('id')->toArray();
        array_unshift($userIds, Auth::id());
        return Post::with('user')
            ->whereHas('user', function ($query) use ($userIds) {
                $query->whereIn('user_id', [Auth::id()] + $userIds);
            })
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
        // TODO: validate post content, requiring at least one character and matching emoji
        $post = Auth::user()->posts()->create($request->only('body'));
        $post->loadMissing('user');
        return $post;
    }

    /**
     * Delete a post
     *
     * @param Post $post
     * @return \Illuminate\Http\Response
     */
    public function delete(Post $post)
    {
        if ($post->user_id != Auth::id()) {
            return abort(403);
        }
        $post->delete();
        return response([
            'success' => true,
        ]);
    }
}
