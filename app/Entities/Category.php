<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'description',
    ];

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
