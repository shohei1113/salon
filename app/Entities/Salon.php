<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    const PAYMENT_INTERVAL = 'month';
    const CURRENCY = 'jpy';

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
     * @param $query
     * @param $categoryId
     * @return mixed
     */
    public function scopeSearchCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }
}
