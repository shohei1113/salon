<?php

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
     * @return mixed
     */
    public function uploadImage($image)
    {
        return Storage::disk('s3')
            ->putFile(env('APP_ENV').'/user', $image, 'public');
    }

}