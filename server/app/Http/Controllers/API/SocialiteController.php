<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\SocialiteService;

class SocialiteController extends Controller
{
    private $socialiteService;
    public function __construct(SocialiteService $socialiteService)
    {
        $this->socialiteService = $socialiteService;
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
    public function socialiteCallback()
    {
        return $this->socialiteService->socialiteCallback();
    }
}