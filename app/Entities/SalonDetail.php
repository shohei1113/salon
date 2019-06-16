<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SalonDetail
 * @package App\Entities
 */
class SalonDetail extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'salon_id', 'contents', 'message', 'target',
    ];
}
