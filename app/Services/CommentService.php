<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Comment;
use App\Repositories\Comment\CommentRepository;

/**
 * Class CommentService
 * @package App\Services
 */
class CommentService
{
    /**
     * @var CommentRepository
     */
    private $commentRepository;

    /**
     * CommentService constructor.
     * @param CommentRepository $commentRepository
     */
    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    /**
     * @param array $attribute
     * @param int $userId
     * @return Comment
     */
    public function createComment(array $attribute, int $userId): Comment
    {
        return $this->commentRepository->create($attribute, $userId);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Comment
     */
    public function updateComment(int $id, array $attribute): Comment
    {
        return $this->commentRepository->update($id, $attribute);
    }

    /**
     * @param int $id
     * @return Comment
     * @throws \Exception
     */
    public function deleteComment(int $id): Comment
    {
        return $this->commentRepository->delete($id);
    }
}