<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Post;
use App\Repositories\Post\PostRepository;
use Illuminate\Database\Eloquent\Collection;

class PostService
{
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }

    public function fetchPostList(?int $postId = NULL): Collection
    {
        return $this->postRepository->fetchPostList($postId);
    }

    public function createPost(array $attribute): Post
    {
        return $this->postRepository->create($attribute);
    }

    public function updatePost(int $id, array $attribute): Post
    {
        return $this->postRepository->update($id, $attribute);
    }
}