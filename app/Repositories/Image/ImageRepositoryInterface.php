<?php
declare(strict_types=1);

namespace App\Repositories\Image;

use App\Entities\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface ImageRepositoryInterface
 * @package App\Repositories\Image
 */
interface ImageRepositoryInterface
{
    /**
     * @param User $user
     * @param string $path
     * @param int $type
     * @return Model
     */
    public function updateImage(User $user, string $path, int $type): Model;
}
