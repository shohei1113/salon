<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\User;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
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
     * @var SESService
     */
    private $sesService;

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
     * @param SESService $sesService
     * @param UserService $userService
     * @param UserRepository $userRepository
     */
    public function __construct(
        JWTAuth $auth,
        SESService $sesService,
        UserService $userService,
        UserRepository $userRepository
    ) {
        $this->auth = $auth;
        $this->sesService = $sesService;
        $this->userRepository = $userRepository;
        $this->userService = $userService;
    }

    /**
     * @param array $attribute
     * @return User
     * @throws Exception
     */
    public function preRegister(array $attribute): User
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepository->create($attribute);
            $this->sesService
                ->sendEmailVerifyMail($user->email, $user->email_verify_token, 'pre_register', config('const.email_title.pre_register'));
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
    public function registerUser(array $attribute, ?UploadedFile $image): User
    {
        $preRegisterUser = $this->userRepository->fetchUserByToken($attribute['token']);

        if (!isset($preRegisterUser)) {
            throw new Exception('invalid token', 401);
        }

        if ($preRegisterUser->email_verified == User::REGISTERED_USER) {
            throw new Exception('registerd user');
        }

        $user = $this->userService->updateUser($preRegisterUser->id, $attribute, $image);
        $user->token = $this->auth->fromUser($user);

        return $user;
    }

    /**
     * @param array $attribute
     * @return User
     * @throws Exception
     */
    public function login(array $attribute): User
    {
        if (!$token = $this->auth->attempt($attribute)) {
            throw new HttpResponseException(
                response()->json(['message' => 'Unauthorized'], 401)
            );
        }

        $user = $this->userRepository->fetchUserByEmail($attribute['email']);

        if ($user->email_verified == User::NOT_REGISTERED_USER) {
            throw new HttpResponseException(
                response()->json(['message' => 'email not verified'], 401)
            );
        }

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
