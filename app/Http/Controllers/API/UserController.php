<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserInfoResource;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function update(Request $request, $id)
    {
        $this->userService->updateUser($id, $request);
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