<?php
namespace App\Repositories\User;

interface UserRepositoryInterface
{
    public function createUser($attribute);

    public function updateUser($attribute);

    public function fetchUserById($id);

    public function fetchUserByToken($token);
}
