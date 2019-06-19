<?php
declare(strict_types=1);

namespace App\Repositories\Image;

use App\Entities\Image;
use App\Entities\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ImageRepository
 * @package App\Repositories\Image
 */
class ImageRepository implements ImageRepositoryInterface
{
    /**
     * @var Image
     */
    private $image;

    /**
     * ImageRepository constructor.
     * @param Image $image
     */
    public function __construct(Image $image)
    {
        $this->image = $image;
    }

    /**
     * @param $user
     * @param $path
     * @param $type
     * @return mixed
     */
    public function updateImage(User $user, string $path, int $type): Model
    {
        return $this->image->updateOrCreate(
            ['imageable_id' => $user->id, 'imageable_type' => $type],
            ['image_path' => $path]
        );
    }
}
