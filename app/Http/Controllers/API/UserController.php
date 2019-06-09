<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserInfoResource;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @return UserInfoResource
     */
    public function loginUserInfo()
    {
        $user = $this->userService->fetchUserById(Auth::id());
        return new UserInfoResource($user);
    }
}