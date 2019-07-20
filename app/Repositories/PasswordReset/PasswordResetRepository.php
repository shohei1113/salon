<?php
declare(strict_types=1);

namespace App\Repositories\PasswordReset;

use App\Entities\PasswordReset;
use Carbon\Carbon;

class PasswordResetRepository implements PasswordResetRepositoryInterface
{
    private $passwordReset;

    public function __construct(PasswordReset $passwordReset)
    {
        $this->passwordReset = $passwordReset;
    }

    public function create(string $email): PasswordReset
    {
        return $this->passwordReset->create([
            'email' => $email,
            'token' => sha1(uniqid($email , true)),
            'created_at' => Carbon::now(),
        ]);
    }

    /**
     * @param string $token
     * @return PasswordReset
     */
    public function fetchEmailByToken(string $token): PasswordReset
    {
        return $this->passwordReset->where('token', $token)->first();
    }

    /**
     * @param string $email
     */
    public function delete(string $email): void
    {
        $this->passwordReset->where('email', $email)->forceDelete();
    }
}
