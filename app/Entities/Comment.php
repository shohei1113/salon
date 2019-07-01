<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Comment
 * @package App\Entities
 */
class Comment extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'user_id', 'post_id', 'content',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'post_id' => 'integer',
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @param $value
     * @return string
     */
    public function getContentAttribute($value): string
    {
        return mb_ereg_replace('(https?://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)', '<a href="\1" target="_blank">\1</a>', $value);
    }
}
