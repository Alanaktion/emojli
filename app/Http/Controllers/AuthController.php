<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests\RegisterFormRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @link https://jwt-auth.readthedocs.io/en/develop/quick-start/#create-the-authcontroller
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Create a new user account.
     *
     * @param RegisterFormRequest $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterFormRequest $request)
    {
        $user = new User;
        $user->email = $request->email;
        $user->username = $request->username;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        $user->save();

        return response([
            'status' => 'success',
            'data' => $user,
        ], 200);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return response([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'msg' => 'Invalid Credentials.'
            ], 400);
        }

        return response([
            'status' => 'success',
        ])->header('Authorization', $token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response([
            'status' => 'success',
            'msg' => 'Logged out Successfully.',
        ], 200);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user()
    {
        return response([
            'status' => 'success',
            'data' => auth()->user(),
        ]);
    }

    /**
     * Refresh a token.
     *
     * Actual token refreshing is handled by the route's middleware.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response([
            'status' => 'success',
        ]);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
