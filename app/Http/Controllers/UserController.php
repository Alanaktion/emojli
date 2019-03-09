<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

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
     * @param User $user
     * @return User
     */
    public function show(User $user)
    {
        return $user;
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
}
