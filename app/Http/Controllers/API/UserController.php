<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\User;
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
     * @param int $id
     * @return UserInfoResource
     * @throws \Exception
     */
    public function update(Request $request, int $id): UserInfoResource
    {
        $user = $this->userService->updateUser($id, $request->all(), $request->image);
        return new UserInfoResource($user, config('const.user.update'));
    }

    /**
     * @return UserInfoResource
     */
    public function info(): UserInfoResource
    {
        $user = $this->userService->fetchUserById(Auth::id());
        return new UserInfoResource($user, config('const.user.info'));
    }
}