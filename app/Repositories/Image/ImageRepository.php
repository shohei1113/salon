<?php

namespace App\Repositories\Image;

use App\Entities\Image;

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
    public function updateImage($user, $path, $type)
    {
        return $this->image->updateOrCreate(
            ['imageable_id' => $user->id, 'imageable_type' => $type],
            ['image_path' => $path]
        );
    }
}
