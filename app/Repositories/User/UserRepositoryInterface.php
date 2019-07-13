<?php
declare(strict_types=1);

namespace App\Repositories\User;

use App\Entities\Salon;
use App\Entities\User;
use Illuminate\Database\Eloquent\Collection;
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
     * @return User
     */
    public function fetchUserByToken(string $token): User;

    /**
     * @param string $email
     * @return User
     */
    public function fetchUserByEmail(string $email): User;

    /**
     * @param User $user
     * @param Salon $salon
     * @return mixed
     */
    public function createUserSalon(User $user, Salon $salon);

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchMemberSalons(int $id): Collection;

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchOwnerSalons(int $id): Collection;

    public function updateEmail(int $id, string $email): User;

}
