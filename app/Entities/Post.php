<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'salon_id', 'title', 'content',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @param $query
     * @param $salonId
     * @return mixed
     */
    public function scopeSearchPost($query, $salonId)
    {
        return $query->where('salon_id', $salonId);
    }
}
