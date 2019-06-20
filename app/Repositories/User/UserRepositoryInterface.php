<?php
declare(strict_types=1);

namespace App\Repositories\User;

use App\Entities\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface UserRepositoryInterface
 * @package App\Repositories\User
 */
interface UserRepositoryInterface
{
    /**
     * @param array $attribute
     * @return User
     */
    public function create(array $attribute): User;

    /**
     * @param int $id
     * @param array $attribute
     * @return User
     */
    public function update(int $id, array $attribute): User;

    /**
     * @param int $id
     * @return User
     */
    public function fetchUserById(int $id): User;

    /**
     * @param string $token
     * @return Model
     */
    public function fetchUserByToken(string $token): Model;

    /**
     * @param string $email
     * @return Model
     */
    public function fetchUserByEmail(string $email): Model;
}
