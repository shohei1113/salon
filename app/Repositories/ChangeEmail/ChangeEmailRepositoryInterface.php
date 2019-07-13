<?php
declare(strict_types=1);

namespace App\Repositories\ChangeEmail;

use App\Entities\ChangeEmail;

interface ChangeEmailRepositoryInterface
{
    public function create(int $id, string $email): ChangeEmail;
}
