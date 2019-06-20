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
     * @param int $id
     * @param string $path
     * @param string $type
     * @return Model
     */
    public function updateImage(int $id, string $path, string $type): Model;
}
