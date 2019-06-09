<?php

namespace App\Repositories\User;

use App\Entities\User;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    /**
     * @var User
     */
    private $user;

    /**
     * UserRepository constructor.
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * @param $attribute
     * @return mixed
     */
    public function createUser($attribute)
    {
        return $this->user->create([
            'name' => $attribute['name'] ?? NULL,
            'email' => $attribute['email'],
            'password' => Hash::make($attribute['password']),
            'email_verify_token' => Hash::make($attribute['email']),
        ]);
    }

    /**
     * @param $user
     * @param $attribute
     * @return bool
     */
    public function updateUser($user, $attribute)
    {
        return $user->update([
            'name' => $attribute['name'] ?? NULL,
            'email_verified' => User::REGISTERED_USER,
        ]);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function fetchUserById($id)
    {
        return $this->user->find($id);
    }

    /**
     * @param $token
     * @return mixed
     */
    public function fetchUserByToken($token)
    {
        return $this->user->where('email_verify_token', $token)->first();
    }

    /**
     * @param $email
     * @return mixed
     */
    public function fetchUserByEmail($email)
    {
        return $this->user->where('email', $email)->first();
    }
}
