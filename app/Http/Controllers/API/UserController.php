<?php
declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Entities\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\SalonResource;
use App\Http\Resources\UserInfoResource;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
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
    public function updateAuthInfo(Request $request): UserInfoResource
    {
        $user = $this->userService->updateUser($this->user->id, $request->only(['email', 'password']));
        return new UserInfoResource($user, config('const.message.user.update'));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return UserInfoResource
     * @throws \Exception
     */
    public function updateBasicInfo(Request $request): UserInfoResource
    {
        $user = $this->userService->updateUser($this->user->id, $request->except(['email', 'password']), $request->image);
        return new UserInfoResource($user, config('const.message.user.update'));
    }

    /**
     * @return UserInfoResource
     */
    public function info(): UserInfoResource
    {
        $user = $this->userService->fetchUserById($this->user->id);
        return new UserInfoResource($user, config('const.message.user.info'));
    }

    /**
     * @return array
     */
    public function mypage(): JsonResponse
    {
        $memberSalons = $this->userService->fetchMemeberSalons($this->user->id);
        $ownerSalons = $this->userService->fetchOwnerSalons($this->user->id);
        return response()->json([
            'data' => [
                'owner' => SalonResource::collection($ownerSalons),
                'member' => SalonResource::collection($memberSalons),
            ],
            'message' => config('const.message.user.mypage'),
        ]);
    }

    /**
     * @param Request $request
     * @return UserInfoResource
     */
    public function sendMailToChangeEmail(Request $request)
    {
        $changeEmailUser = $this->userService->sendMailToChangeEmail($this->user->id, $request->input('email'));
        return new UserInfoResource($changeEmailUser, config('const.message.user.send_mail_email_reset'));
    }

    /**
     * @param Request $request
     * @return UserInfoResource
     * @throws \Exception
     */
    public function resetEmail(Request $request)
    {
        $user = $this->userService->resetEmail($request->all());
        return new UserInfoResource($user, config('const.message.user.email_reset'));
    }

    /**
     * @param Request $request
     * @return UserInfoResource
     */
    public function sendMailToPasswordResetUser(Request $request)
    {
        $user = $this->userService->sendMailToPasswordResetUser($request->input('email'));
        return new UserInfoResource($user, config('const.message.user.send_mail_password_reset'));
    }

    /**
     * @param Request $request
     * @throws \Exception
     */
    public function resetPassword(Request $request)
    {
        $user = $this->userService->resetPassword($request->all());
        return new UserInfoResource($user, config('const.message.user.password_reset'));
    }
}