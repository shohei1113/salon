<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'description',
    ];

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
