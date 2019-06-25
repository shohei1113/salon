<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Image
 * @package App\Entities
 */
class Image extends Model
{
    const TYPE_USER = 'App\Entities\User';
    const TYPE_POST = 'App\Entities\Post';
    const TYPE_SALON = 'App\Entities\Salon';
    const TYPE_CATEGORY = 'App\Entities\Category';
    const S3_DIR_USER = '/user';
    const S3_DIR_POST = '/post';
    const S3_DIR_SALON = '/salon';
    const S3_DIR_CATEGORY = '/category';

    /**
     * @var array
     */
    protected $fillable = [
        'imageable_id', 'imageable_type', 'image_path',
    ];

    /**
     * @param $value
     * @return string
     */
    public function getImagePathAttribute($value)
    {
        return env('AWS_S3_URL').$value;
    }
}
