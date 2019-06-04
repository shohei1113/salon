<?php
namespace App\Services;
use App\Entities\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\JWTAuth;

class AuthService
{
    private $auth;
    private $user;

    public function __construct(JWTAuth $auth, User $user)
    {
        $this->auth = $auth;
        $this->user = $user;
    }

    /**
     * @param $data
     * @return mixed
     */
    public function registerUser($data)
    {
        return $this->user->createUser($data);
    }

    /**
     * @param $data
     * @throws \Exception
     */
    public function login($data)
    {
        if (!$token = $this->auth->attempt($data)) {
            throw new \Exception('Unauthorized', 401);
        }
        return $token;
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