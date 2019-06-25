<?php
declare(strict_types=1);

namespace App\Repositories\Comment;

use App\Entities\Comment;

/**
 * Class CommentRepository
 * @package App\Repositories\Comment
 */
class CommentRepository implements CommentRepositoryInterface
{
    /**
     * @var Comment
     */
    private $comment;

    /**
     * CommentRepository constructor.
     * @param Comment $comment
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * @param array $attribute
     * @param int $userId
     * @return Comment
     */
    public function create(array $attribute, int $userId): Comment
    {
        return $this->comment->create([
            'user_id' => $userId,
            'post_id' => $attribute['post_id'],
            'content' => $attribute['content'],
        ]);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Comment
     */
    public function update(int $id, array $attribute): Comment
    {
        $comment = $this->comment->findOrFail($id);
        $comment->update([
            'content' => $attribute['content'],
        ]);

        return $comment;
    }

    /**
     * @param int $id
     * @return Comment
     * @throws \Exception
     */
    public function delete(int $id): Comment
    {
        $comment = $this->comment->findOrFail($id);
        $comment->delete();

        return $comment;
    }
}
