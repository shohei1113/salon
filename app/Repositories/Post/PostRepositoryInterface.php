<?php
declare(strict_types=1);

namespace App\Repositories\Post;

use App\Entities\Post;
use Illuminate\Database\Eloquent\Collection;

interface PostRepositoryInterface
{
    public function fetchPostList(?int $salonId): Collection;

    public function create(array $attribute): Post;

    public function update(int $id, array $attribute): Post;

    public function delete(int $id): Post;
}
