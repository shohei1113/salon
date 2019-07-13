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

    public function create(int $id, string $email): ChangeEmail
    {
        return $this->changeEmail->create([
            'user_id' => $id,
            'email' => $email,
            'token' => sha1(uniqid($email , true)),
            'status' => ChangeEmail::UNREGISTERED,
        ]);
    }
}
