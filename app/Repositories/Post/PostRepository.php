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
            return $this->post->searchPost($postId)->get();
        }

        return $this->post->all();
    }

    public function create(array $attribute): Post
    {
        return $this->post->create($attribute);
    }

    public function update(int $id, array $attribute): Post
    {
        $post = $this->post->findOrFail($id);
        $post->update($attribute);
        return $post;
    }

    public function delete(int $id): Post
    {
        $post = $this->post->findOrFail($id);
        $post->delete();
        return $post;
    }
}
