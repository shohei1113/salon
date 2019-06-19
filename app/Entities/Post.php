<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'salon_id', 'title', 'content',
    ];

    public function scopeSearchPost($query, $salonId)
    {
        return $query->where('salon_id', $salonId);
    }
}
