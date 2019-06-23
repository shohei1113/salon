<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\User;
use App\Mail\EmailVerification;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\JWTAuth;

/**
 * Class AuthService
 * @package App\Services
 */
class AuthService
{
    /**
     * @var JWTAuth
     */
    private $auth;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var UserService
     */
    private $userService;

    /**
     * AuthService constructor.
     * @param JWTAuth $auth
     * @param UserService $userService
     * @param UserRepository $userRepository
     */
    public function __construct(JWTAuth $auth, UserService $userService, UserRepository $userRepository)
    {
        $this->auth = $auth;
        $this->userRepository = $userRepository;
        $this->userService = $userService;
    }

    /**
     * @param array $attribute
     * @return User
     * @throws Exception
     */
    public function signupUser(array $attribute): User
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepository->create($attribute);
            $this->sendPreRegisterMail($user);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage(), $e->getCode());
        }

        return $user;
    }

    /**
     * @param array $attribute
     * @param UploadedFile $image
     * @return User
     * @throws Exception
     */
    public function registerUser(array $attribute, UploadedFile $image): User
    {
        $user = $this->userRepository->fetchUserByToken($attribute['token']);

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
     * @param User $user
     */
    public function sendPreRegisterMail(User $user)
    {
        $email = new EmailVerification($user);
        Mail::to($user->email)->send($email);
    }

    /**
     * @param array $attribute
     * @return User
     * @throws Exception
     */
    public function login(array $attribute): User
    {
        if (!$token = $this->auth->attempt($attribute)) {
            throw new Exception('Unauthorized', 401);
        }
        $user = $this->userRepository->fetchUserByEmail($attribute['email']);
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
