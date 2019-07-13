<?php
declare(strict_types=1);

namespace App\Repositories\ChangeEmail;

use App\Entities\ChangeEmail;

interface ChangeEmailRepositoryInterface
{
    /**
     * @param int $id
     * @param string $email
     * @return ChangeEmail
     */
    public function updateOrCreate(int $id, string $email): ChangeEmail;

    /**
     * @param string $token
     * @return ChangeEmail
     */
    public function fetchChangeEmailByToken(string $token): ChangeEmail;

    public function registeredEmail(int $id): void;
}
