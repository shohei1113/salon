<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Subscription
 * @package App\Entities
 */
class Subscription extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'name', 'stripe_id', 'stripe_plan', 'quantity',
        'trial_ends_at', 'ends_at', 'user_ud'
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
