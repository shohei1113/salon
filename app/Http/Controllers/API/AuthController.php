<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\AuthResource;
use App\Http\Resources\UserInfoResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class AuthController
 * @package App\Http\Controllers\API
 */
class AuthController extends Controller
{
    /**
     * @var AuthService
     */
    private $authService;

    /**
     * AuthController constructor.
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @param RegisterRequest $request
     * @return UserInfoResource
     * @throws \Exception
     */
    public function signup(RegisterRequest $request): UserInfoResource
    {
        $registerUser = $this->authService->signupUser($request->all());
        return new UserInfoResource($registerUser, config('const.auth.signup'));
    }

    /**
     * @param Request $request
     * @return AuthResource
     * @throws \Exception
     */
    public function register(Request $request): AuthResource
    {
        dd($request->image);
        $user = $this->authService->registerUser($request->all(), $request->image);
        return new AuthResource($user, config('const.auth.register'));
    }

    /**
     * @param Request $request
     * @return AuthResource
     * @throws \Exception
     */
    public function login(Request $request): AuthResource
    {
        $user = $this->authService->login($request->all());
        return new AuthResource($user, config('const.auth.login'));
    }

    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        return response()->json([
            'message' => config('const.auth.logout')
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | 以下、facebookログイン用(実装保留)
    |--------------------------------------------------------------------------
    */

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
}
