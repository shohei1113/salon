<?php

namespace App\Services;

use App\Entities\User;
use App\Mail\EmailVerification;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\JWTAuth;

class AuthService
{
    /**
     * @var JWTAuth
     */
    private $auth;

    /**
     * @var UserRepository
     */
    private $user;

    /**
     * @var
     */
    private $userService;

    /**
     * AuthService constructor.
     * @param JWTAuth $auth
     * @param UserRepository $user
     */
    public function __construct(JWTAuth $auth, UserService $userService, UserRepository $user)
    {
        $this->auth = $auth;
        $this->user = $user;
        $this->userService = $userService;
    }

    /**
     * @param $attribute
     * @return mixed
     * @throws Exception
     */
    public function signupUser($attribute)
    {
        DB::beginTransaction();
        try {
            $user = $this->user->createUser($attribute);
            $this->sendPreRegisterMail($user);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage(), $e->getCode());
        }

        return $user;
    }

    /**
     * @param $attribute
     * @return mixed
     * @throws Exception
     */
    public function registerUser($attribute, $image)
    {
        $user = $this->user->fetchUserByToken($attribute['token']);

        if (!isset($user)) {
            throw new Exception('invalid token', 401);
        }

        if ($user->email_verified == User::REGISTERED_USER) {
            throw new Exception('registerd user');
        }

        $this->userService->updateUser($user->id, $attribute, $image);
        $user->token = $this->auth->fromUser($user);

        return $user;
    }

    /**
     * @param $user
     */
    public function sendPreRegisterMail($user)
    {
        $email = new EmailVerification($user);
        Mail::to($user->email)->send($email);
    }

    /**
     * @param $attribute
     * @return mixed
     * @throws Exception
     */
    public function login($attribute)
    {
        if (!$token = $this->auth->attempt($attribute)) {
            throw new Exception('Unauthorized', 401);
        }
        $user = $this->user->fetchUserByEmail($attribute['email']);
        $user->token = $token;
        return $user;
    }

    /*
    |--------------------------------------------------------------------------
    | 以下、facebookログイン用(実装保留)
    |--------------------------------------------------------------------------
    */

    /**
     * @param $socialite
     * @return mixed
     */
    public function getRedirectToSocialiteUrl($socialite)
    {
        return Socialite::driver($socialite)->redirect()->getTargetUrl();
    }

    /**
     * @param $socialite
     * @return JsonResponse
     */
    public function handleProviderCallback($socialite)
    {
        $providerUser = Socialite::driver($socialite)->stateless()->user();
        $socialUser = User::query()->firstOrNew(['email' => $providerUser->getEmail()]);

        if (!$socialUser->exists) {
            $socialUser->name = $providerUser->getName();
            $socialUser->save();
        }

        $token = $this->auth->fromUser($socialUser);

        return new JsonResponse([
            'token' => $token
        ]);
    }
}
