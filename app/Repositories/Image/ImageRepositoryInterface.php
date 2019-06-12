<?php

namespace App\Repositories\Image;

/**
 * Interface ImageRepositoryInterface
 * @package App\Repositories\Image
 */
interface ImageRepositoryInterface
{
    /**
     * @param $user
     * @param $path
     * @param $type
     * @return mixed
     */
    public function updateImage($user, $path, $type);
}
