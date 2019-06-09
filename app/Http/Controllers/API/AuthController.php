<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private $auth;
    private $authService;

    /**
     * AuthController constructor.
     * @param JWTAuth $auth
     * @param AuthService $authService
     */
    public function __construct(JWTAuth $auth, AuthService $authService)
    {
        $this->auth = $auth;
        $this->authService = $authService;
    }

    /**
     * @param RegisterRequest $request
     * @return RegisterResource
     * @throws \Exception
     */
    public function signup(RegisterRequest $request)
    {
        $registerUser = $this->authService->signupUser($request->all());
        return new RegisterResource($registerUser);
    }

    /**
     * @param Request $request
     * @return string
     * @throws \Exception
     */
    public function register(Request $request)
    {
        $token = $this->authService->registerUser($request->all());

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expire_in' => auth('api')->factory()->getTTL(),
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function login(Request $request)
    {
        $token = $this->authService->login($request->only(['email', 'password']));

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
                'redirect_url' => $this->authService->getRedirectToSocialiteUrl($socialite),
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
        return $this->authService->handleProviderCallback($socialite);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'logout']);
    }
}
