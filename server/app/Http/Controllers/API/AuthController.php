<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\SocialiteService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private $auth;
    private $logger;
    private $socialiteService;

    public function __construct(JWTAuth $auth, SocialiteService $socialiteService)
    {
        $this->auth = $auth;
        $this->socialiteService = $socialiteService;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if (!$token = $this->auth->attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expire_in' => auth('api')->factory()->getTTL(),
        ]);
    }

    /**
     * @param $socialite
     * @return \Illuminate\Http\JsonResponse
     */
    public function redirectToSocialiteProvider($socialite)
    {
        return response()->json(
            [
                'redirect_url' => $this->socialiteService->getRedirectToSocialiteUrl($socialite),
            ],
            200, ['Content-Type' => 'application/json'],
            JSON_UNESCAPED_SLASHES
        );
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function socialiteCallback($socialite)
    {
        return $this->socialiteService->handleProviderCallback($socialite);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'logout']);
    }
}
