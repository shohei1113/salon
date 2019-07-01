<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use phpDocumentor\Reflection\Types\Mixed_;

class Post extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $fillable = [
        'salon_id', 'title', 'content',
    ];

    /**
     * @return HasMany
     */
    public function comment(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return MorphOne
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @param $query
     * @param $salonId
     * @return Builder
     */
    public function scopeSearchPost($query, $salonId): Builder
    {
        return $query->where('salon_id', $salonId);
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
