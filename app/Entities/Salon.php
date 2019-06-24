<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    const PAYMENT_INTERVAL = 'month';
    const CURRENCY = 'jpy';
    const IS_MEMBER= true;
    const IS_NOT_MEMBER = false;

    protected $fillable = [
        'owner_id', 'category_id', 'title', 'description',
        'title', 'description', 'price', 'plan_id', 'product_id',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function salon_detail()
    {
        return $this->hasOne(SalonDetail::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_salon');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function post()
    {
        return $this->hasMany(Post::class)->orderBy('created_at', 'desc');
    }

    /**
     * @param $query
     * @param $categoryId
     * @return mixed
     */
    public function scopeSearchCategory($query, $categoryId)
    {
        if (!empty($categoryId)) {
            return $query->where('category_id', $categoryId);
        }
    }

    /**
     * @return int
     */
    public function getIsMemberAttribute()
    {
        return $this->users->count() ? self::IS_MEMBER : self::IS_NOT_MEMBER;
    }
}
