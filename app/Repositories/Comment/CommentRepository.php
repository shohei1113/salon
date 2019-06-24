<?php
declare(strict_types=1);

namespace App\Repositories\Comment;

use App\Entities\Comment;

class CommentRepository implements CommentRepositoryInterface
{
    private $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    public function create(array $attribute, int $userId): Comment
    {
        return $this->comment->create([
            'user_id' => $userId,
            'salon_id' => $attribute['salon_id'],
            'content' => $attribute['content'],
        ]);
    }

    public function update(int $id, array $attribute): Comment
    {
        dd($attribute);
        $comment = $this->comment->findOrFail($id);
        $comment->update([
            'content' => $attribute['content'],
        ]);

        return $comment;
    }
}
