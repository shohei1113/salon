<?php
declare(strict_types=1);

namespace App\Repositories\ChangeEmail;

use App\Entities\ChangeEmail;

class ChangeEmailRepository implements ChangeEmailRepositoryInterface
{
    /**
     * @var ChangeEmail
     */
    private $changeEmail;

    /**
     * ChangeEmailRepository constructor.
     * @param ChangeEmail $changeEmail
     */
    public function __construct(ChangeEmail $changeEmail)
    {
        $this->changeEmail = $changeEmail;
    }

    /**
     * @param int $id
     * @param string $email
     * @return ChangeEmail
     */
    public function updateOrCreate(int $id, string $email): ChangeEmail
    {
        return $this->changeEmail->updateOrCreate(
            [
                'user_id' => $id,
                'status' => ChangeEmail::UNREGISTERED
            ],
            [
                'email' => $email,
                'token' => sha1(uniqid($email , true)),
            ]
        );
    }

    /**
     * @param string $token
     * @return ChangeEmail
     */
    public function fetchChangeEmailByToken(string $token): ChangeEmail
    {
        return $this->changeEmail->where('token', $token)->first();
    }

    /**
     * @param int $id
     */
    public function registeredEmail(int $id): void
    {
        $changeEmail = $this->changeEmail->find($id);
        $changeEmail->update([
            'status' => ChangeEmail::REGISTERED,
        ]);
    }
}
