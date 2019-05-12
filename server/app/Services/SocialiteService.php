<?php
namespace App\Services;
use App\Entities\SocialiteAccount;
use App\Entities\User;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\One\User as SocialiteOneUser;
use InvalidArgumentException;
use phpDocumentor\Reflection\Types\String_;
use App\Exceptions\EmailAlreadyExistsException;

class SocialiteService
{
    public function getRedirectToSocialiteUrl($socialite)
    {
        return Socialite::driver($socialite)->redirect()->getTargetUrl();
    }
    public function socialiteCallback()
    {
        try {
            return response()->json($this->getCredentialsBySocialite());
        } catch (InvalidArgumentException $e) {
            return $this->errorJsonResponse('Facebook invalid error');
        } catch (EmailAlreadyExistsException $e) {
            return $this->errorJsonResponse(
                "{$e->getEmail()} は既に使用されているメールアドレスです。"
            );
        }
    }
    public function getCredentialsBySocialite()
    {
        $facebookUser = Socialite::driver('facebook')->stateless()->user();

        $socialAccount = SocialiteAccount::firstOrNew([
            'provider' => 'facebook',
            'account_id' => $facebookUser->getId(),
        ]);

        $user = $this->resolveUser($socialAccount, $facebookUser);

        return [
            'user' => $user,
            'access_token' => $user->createToken('token')->accessToken,
        ];
    }
    public function resolveUser(SocialiteAccount $socialAccount, $facebookUser)
    {
//        if ($socialAccount->exists) {
//            dd($facebookUser);
//            return User::find($socialAccount->getAttribute('user_id'));
//        }
//        if (User::where('email', $facebookUser->getEmail())->exists()) {
//            throw new EmailAlreadyExistsException($facebookUser->getEmail());
//        }

        $createUser = User::create([
            'name' => $facebookUser->getName(),
            'email' => $facebookUser->getEmail(),
            'password' => null,
        ]);


        $socialAccount->setAttribute('user_id', $createUser->id);
        $socialAccount->save();

        return $createUser;
    }
    public function errorJsonResponse(string $message)
    {
        return response()->json(compact('message'), 400);
    }
}