<?php
declare(strict_types=1);

namespace App\Repositories\Post;

use App\Entities\Post;
use Illuminate\Database\Eloquent\Collection;

/**
 * Interface PostRepositoryInterface
 * @package App\Repositories\Post
 */
interface PostRepositoryInterface
{
    /**
     * @param int|null $salonId
     * @return Collection
     */
    public function fetchPostList(?int $salonId): Collection;

    /**
     * @param int $id
     * @return Post
     */
    public function fetchPostById(int $id): Post;

    /**
     * @param array $attribute
     * @return Post
     */
    public function create(array $attribute): Post;

    /**
     * @param int $id
     * @param array $attribute
     * @return Post
     */
    public function update(int $id, array $attribute): Post;

    /**
     * @param int $id
     * @return Post
     */
    public function delete(int $id): Post;
}
