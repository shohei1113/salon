<?php
declare(strict_types=1);

namespace App\Repositories\Post;

use App\Entities\Post;
use Illuminate\Database\Eloquent\Collection;

/**
 * Class PostRepository
 * @package App\Repositories\Post
 */
class PostRepository implements PostRepositoryInterface
{
    /**
     * @var Post
     */
    private $post;

    /**
     * PostRepository constructor.
     * @param Post $post
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * @param int|null $postId
     * @return Collection
     */
    public function fetchPostList(?int $postId): Collection
    {
        if (!empty($postId)) {
            return $this->post->searchPost($postId)->get();
        }

        return $this->post->all();
    }

    /**
     * @param array $attribute
     * @return Post
     */
    public function create(array $attribute): Post
    {
        return $this->post->create($attribute);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Post
     */
    public function update(int $id, array $attribute): Post
    {
        $post = $this->post->findOrFail($id);
        $post->update($attribute);
        return $post;
    }

    /**
     * @param int $id
     * @return Post
     */
    public function delete(int $id): Post
    {
        $post = $this->post->findOrFail($id);
        $post->delete();
        return $post;
    }
}
