<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserInfoResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class UserController
 * @package App\Http\Controllers\API
 */
class UserController extends Controller
{
    /**
     * @var UserService
     */
    private $userService;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @param $id
     * @return string
     * @throws \Exception
     */
    public function update(Request $request, $id)
    {
        $user = $this->userService->updateUser($id, $request->all(), $request->image);
        return new UserInfoResource($user);
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