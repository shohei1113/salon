<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Comment;
use App\Repositories\Comment\CommentRepository;

class CommentService
{
    private $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function createComment(array $attribute, int $userId): Comment
    {
        return $this->commentRepository->create($attribute, $userId);
    }

    public function updateComment(int $id, array $attribute): Comment
    {
        return $this->commentRepository->update($id, $attribute);
    }
}