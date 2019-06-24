<?php
declare(strict_types=1);

namespace App\Repositories\Comment;

use App\Entities\Comment;

interface CommentRepositoryInterface
{
    public function create(array $attribute, int $userId): Comment;

    public function update(int $id, array $attribute): Comment;
}
