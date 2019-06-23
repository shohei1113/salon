<?php
declare(strict_types=1);

namespace App\Services;

use App\Repositories\Image\ImageRepository;

/**
 * Class ImageService
 * @package App\Services
 */
class ImageService
{
    private $imageRepository;

    private $s3Service;

    public function __construct(
        ImageRepository $imageRepository,
        S3Service $s3Service
    ) {
        $this->imageRepository = $imageRepository;
        $this->s3Service = $s3Service;
    }

    /**
     * @param $image
     * @param $typeId
     * @param $dir
     * @param $type
     */
    public function upload($image, $typeId, $dir, $type)
    {
        if (isset($image)) {
            $imagePath = $this->s3Service->uploadImage($image, $dir);
            $this->imageRepository->updateImage($typeId, $imagePath, $type);
        }
    }
}