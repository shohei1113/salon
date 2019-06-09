<?php

namespace App\Repositories\User;

/**
 * Interface UserRepositoryInterface
 * @package App\Repositories\User
 */
interface UserRepositoryInterface
{
    /**
     * @param $attribute
     * @return mixed
     */
    public function createUser($attribute);

    /**
     * @param $user
     * @param $attribute
     * @return mixed
     */
    public function updateUser($user, $attribute);

    /**
     * @param $id
     * @return mixed
     */
    public function fetchUserById($id);

    /**
     * @param $token
     * @return mixed
     */
    public function fetchUserByToken($token);

    /**
     * @param $email
     * @return mixed
     */
    public function fetchUserByEmail($email);
}
