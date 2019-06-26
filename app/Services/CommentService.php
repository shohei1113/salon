<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Comment;
use App\Entities\Post;
use App\Repositories\Comment\CommentRepository;
use App\Repositories\Post\PostRepository;
use Illuminate\Database\Eloquent\Collection;

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
     * @var PostRepository
     */
    private $postRepository;

    /**
     * CommentService constructor.
     * @param CommentRepository $commentRepository
     * @param PostRepository $postRepository
     */
    public function __construct(
        CommentRepository $commentRepository,
        PostRepository $postRepository
    ) {
        $this->commentRepository = $commentRepository;
        $this->postRepository = $postRepository;
    }

    /**
     * @param array $attribute
     * @param int $userId
     * @return Post
     */
    public function createComment(array $attribute, int $userId): Post
    {
        $createComment = $this->commentRepository->create($attribute, $userId);
        return $this->postRepository->fetchPostById($createComment->post_id);

    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Post
     */
    public function updateComment(int $id, array $attribute): Post
    {
        $updateComment = $this->commentRepository->update($id, $attribute);
        return $this->postRepository->fetchPostById($updateComment->post_id);
    }

    /**
     * @param int $id
     * @return Post
     * @throws \Exception
     */
    public function deleteComment(int $id): Post
    {
        $deleteComment = $this->commentRepository->delete($id);
        return $this->postRepository->fetchPostById($deleteComment->post_id);
    }
}