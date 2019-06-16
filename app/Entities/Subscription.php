<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'name', 'stripe_id', 'stripe_plan', 'quantity',
        'trial_ends_at', 'ends_at', 'user_ud'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
