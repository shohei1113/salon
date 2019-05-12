<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private $auth;
    private $logger;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function login(Request $request)
    {
        $token = $this->auth->attempt($request->only('email', 'password'));
        abort_unless($token, 401, 'Invalid credentials');

        return response()->json(compact('token'));
    }
}
