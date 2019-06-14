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
}
