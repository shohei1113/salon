<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class ChangeEmail extends Model
{
    const UNREGISTERED = 0;
    const REGISTER = 1;
    const INVALID = 2;

    /**
     * @var array
     */
    protected $fillable = [
        'user_id', 'email', 'token', 'status',
    ];
}
