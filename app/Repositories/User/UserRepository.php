<?php
declare(strict_types=1);

namespace App\Repositories\User;

use App\Entities\Salon;
use App\Entities\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class UserRepository
 * @package App\Repositories\User
 */
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
     * @param array $attribute
     * @return User
     */
    public function create(array $attribute): User
    {
        return $this->user->create([
            'name' => $attribute['name'] ?? NULL,
            'email' => $attribute['email'],
            'password' => Hash::make($attribute['password']),
            'email_verify_token' => sha1(uniqid($attribute['email'] , true)),
        ]);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return User
     */
    public function update(int $id, array $attribute): User
    {
        $user = $this->user->find($id);
        if (isset($attribute['password'])) {
            $attribute['password'] = Hash::make($attribute['password']);
        }
        $attribute['email_verified'] = User::REGISTERED_USER;
        $user->update($attribute);

        return $user;
    }

    /**
     * @param int $id
     * @return User
     */
    public function fetchUserById(int $id): User
    {
        return $this->user->find($id);
    }

    /**
     * @param string $token
     * @return User
     */
    public function fetchUserByToken(string $token): User
    {
        return $this->user->searchEmailVerifyToken($token)->first();
    }

    /**
     * @param string $email
     * @return User
     */
    public function fetchUserByEmail(string $email): User
    {
        return $this->user->searchEmail($email)->first();
    }

    /**
     * @param User $user
     * @param Salon $salon
     * @return mixed|void
     */
    public function createUserSalon(User $user, Salon $salon)
    {
        return $user->salons()->save($salon);
    }

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchMemberSalons(int $id): Collection
    {
        return $this->user->find($id)->salons;
    }

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchOwnerSalons(int $id): Collection
    {
        return $this->user->find($id)->owner_salons;
    }

}
