<?php
declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Storage;

/**
 * Class S3Service
 * @package App\Services
 */
class S3Service
{
    /**
     * @param $image
     * @param $dir
     * @return string
     */
    public function uploadImage($image, $dir): string
    {
        return Storage::disk('s3')
            ->putFile(env('APP_ENV').$dir, $image, 'public');
    }

}