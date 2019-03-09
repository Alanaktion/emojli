<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('user', 'AuthController@user');
    Route::post('logout', 'AuthController@logout');
    Route::group(['middleware' => 'jwt.refresh'], function() {
        Route::get('refresh', 'AuthController@refresh');
    });
});

Route::get('posts', 'PostController@index');
Route::get('posts/{post}', 'PostController@show');
Route::get('users', 'UserController@index');
Route::get('users/{user}', 'UserController@show');
Route::get('users/{user}/posts', 'UserController@posts');

Route::group(['middleware' => 'auth:api'], function ($router) {
    Route::post('posts', 'PostController@store');
});
