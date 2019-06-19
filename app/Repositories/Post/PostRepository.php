<?php
declare(strict_types=1);

namespace App\Repositories\Post;

use App\Entities\Post;
use Illuminate\Database\Eloquent\Collection;

class PostRepository implements PostRepositoryInterface
{
    private $post;

    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function fetchPostList(?int $postId): Collection
    {
        if (!empty($postId)) {
            return $this->post->searchPost($postId);
        }

        return $this->post->all();
    }

    public function create(array $attribute): Post
    {
        return $this->post->create($attribute);
    }

    public function update(int $id, array $attribute): Post
    {
        $post = $this->post->find($id);
        $post->update($attribute);
        return $post;
    }
}
