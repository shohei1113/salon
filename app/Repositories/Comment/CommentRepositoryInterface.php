<?php
declare(strict_types=1);

namespace App\Repositories\Comment;

use App\Entities\Comment;

/**
 * Interface CommentRepositoryInterface
 * @package App\Repositories\Comment
 */
interface CommentRepositoryInterface
{
    /**
     * @param array $attribute
     * @param int $userId
     * @return Comment
     */
    public function create(array $attribute, int $userId): Comment;

    /**
     * @param int $id
     * @param array $attribute
     * @return Comment
     */
    public function update(int $id, array $attribute): Comment;

    /**
     * @param int $id
     * @return mixed
     */
    public function delete(int $id);
}
