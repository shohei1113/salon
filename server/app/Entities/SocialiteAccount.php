<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class SocialiteAccount extends Model
{
    protected $fillable = [
        'user_id',
        'provider',
        'account_id',
    ];

    public $timestamps = false;

}
