<?php
declare(strict_types=1);

namespace App\Repositories\PasswordReset;

use App\Entities\PasswordReset;
use Mockery\Generator\StringManipulation\Pass\Pass;

interface PasswordResetRepositoryInterface
{
    /**
     * @param string $email
     * @return PasswordReset
     */
    public function create(string $email): PasswordReset;

    /**
     * @param string $token
     * @return PasswordReset
     */
    public function fetchEmailByToken(string $token): PasswordReset;

    public function delete(string $email): void;
}
