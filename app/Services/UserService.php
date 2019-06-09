<?php

namespace App\Services;

use App\Repositories\User\UserRepository;

class UserService
{
    private $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    /**
     * @param $id
     * @return mixed
     */
    public function fetchUserById($id)
    {
        return $this->user->fetchUserById($id);
    }
}