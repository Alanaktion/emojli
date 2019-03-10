<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Get the most recent users
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()
            ->simplePaginate(30);
    }

    /**
     * Get a single user
     *
     * If authenticated, also include whether they're following/followed by them
     *
     * @param User $user
     * @return User
     */
    public function show(User $user)
    {
        if (!Auth::check()) {
            return $user;
        }

        return response()->json(
            $user->toArray() + [
                'follows_me' => $user->following()->exists(Auth::user()),
                'following' => $user->followers()->exists(Auth::user()),
            ]
        );
    }

    /**
     * Get a user's posts
     *
     * @param User $user
     * @return User
     */
    public function posts(User $user)
    {
        return $user->posts()->with('user')
            ->latest()
            ->simplePaginate(30);
    }

    /**
     * Get a user's followers
     *
     * @param User $user
     * @return array
     */
    public function followers(User $user)
    {
        return $user->followers;
    }

    /**
     * Get a users this user is following
     *
     * @param User $user
     * @return array
     */
    public function following(User $user)
    {
        return $user->following;
    }

    /**
     * Follow a user
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function follow(User $user)
    {
        $me = Auth::user();

        // Prevent users from following themselves
        Validator::make(['user_id' => $user->id], [
            'user_id' => 'required|not_in:' . $me->id,
        ])->validate();

        // Silently ignore requests to follow a user they are already following
        if ($me->following()->exists($user)) {
            return response([
                'success' => true,
                'existed' => true,
            ], 200);
        }

        $me->following()->attach($user->id);
        return response([
            'success' => true,
        ], 201);
    }

    /**
     * Unfollow a user
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function unfollow(User $user)
    {
        Auth::user()->following()->detach($user->id);
        return response([
            'success' => true,
        ], 200);
    }
}
