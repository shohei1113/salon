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
     * @param int $id
     * @param string $path
     * @param string $type
     * @return Model
     */
    public function updateImage(int $id, string $path, string $type): Model
    {
        return $this->image->updateOrCreate(
            ['imageable_id' => $id, 'imageable_type' => $type],
            ['image_path' => $path]
        );
    }
}
