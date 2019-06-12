<?php

namespace App\Services;

use App\Entities\User;
use App\Mail\EmailVerification;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
     * AuthService constructor.
     * @param JWTAuth $auth
     * @param UserRepository $user
     */
    public function __construct(JWTAuth $auth, UserRepository $user)
    {
        $this->auth = $auth;
        $this->user = $user;
    }

    /**
     * @param $data
     * @return mixed
     * @throws Exception
     */
    public function signupUser($data)
    {
        DB::beginTransaction();
        try {
            $user = $this->user->createUser($data);
            $this->sendPreRegisterMail($user);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage(), $e->getCode());
        }

        return $user;
    }

    /**
     * @param $data
     * @return mixed
     * @throws Exception
     */
    public function registerUser($data)
    {
        $user = $this->user->fetchUserByToken($data['token']);

        if (!isset($user)) {
            throw new Exception('invalid token', 401);
        }

        if ($user->email_verified == User::REGISTERED_USER) {
            throw new Exception('registerd user');
        }

        $this->user->updateUser($user->id, $data);
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
     * @param $data
     * @return mixed
     * @throws Exception
     */
    public function login($data)
    {
        if (!$token = $this->auth->attempt($data)) {
            throw new Exception('Unauthorized', 401);
        }
        $user = $this->user->fetchUserByEmail($data['email']);
        $user->token = $token;
        return $user;
    }

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
