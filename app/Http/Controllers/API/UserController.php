<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\BaseResource;
use App\Http\Resources\SalonResource;
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
     * @var User
     */
    private $user;

    /**
     * UserController constructor.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        $this->user = Auth::user();
    }

    /**
     * @param Request $request
     * @param int $id
     * @return UserInfoResource
     * @throws \Exception
     */
    public function updateAuthInfo(Request $request, int $id): UserInfoResource
    {
        $user = $this->userService->updateUser($id, $request->only(['email', 'password']));
        return new UserInfoResource($user, config('const.user.update'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return UserInfoResource
     * @throws \Exception
     */
    public function updateBasicInfo(Request $request, int $id): UserInfoResource
    {
        $user = $this->userService->updateUser($id, $request->except(['email', 'password']), $request->image);
        return new UserInfoResource($user, config('const.user.update'));
    }

    /**
     * @return UserInfoResource
     */
    public function info(): UserInfoResource
    {
        $user = $this->userService->fetchUserById($this->user->id);
        return new UserInfoResource($user, config('const.user.info'));
    }

    /**
     * @return BaseResource
     */
    public function mypage(): BaseResource
    {
        $userSalons = $this->userService->fetchUserWithSalon($this->user->id);
        return new BaseResource(SalonResource::collection($userSalons));

    }
}