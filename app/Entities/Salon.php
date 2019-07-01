<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Auth;

class Salon extends Model
{
    use SoftDeletes;

    const PAYMENT_INTERVAL = 'month';
    const CURRENCY = 'jpy';
    const IS_MEMBER = true;
    const IS_NOT_MEMBER = false;

    protected $fillable = [
        'owner_id', 'category_id', 'title', 'description',
        'title', 'description', 'price', 'plan_id', 'product_id',
    ];

    /**
     * @return HasOne
     */
    public function salon_detail(): HasOne
    {
        return $this->hasOne(SalonDetail::class);
    }

    /**
     * @return BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    /**
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return MorphOne
     */
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_salon');
    }

    /**
     * @return HasMany
     */
    public function post(): HasMany
    {
        return $this->hasMany(Post::class)->orderBy('created_at', 'desc');
    }

    /**
     * @param $query
     * @param $categoryId
     * @return Builder
     */
    public function scopeSearchCategory($query, $categoryId): Builder
    {
        if (!empty($categoryId)) {
            return $query->where('category_id', $categoryId);
        }
    }

    /**
     * @return bool
     */
    public function getIsMemberAttribute(): bool
    {
        return $this->users->find(Auth::id()) ? self::IS_MEMBER : self::IS_NOT_MEMBER;
    }

    /**
     * @param $value
     * @return string
     */
    public function getDescriptionAttribute($value): string
    {
        return mb_ereg_replace('(https?://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)', '<a href="\1" target="_blank">\1</a>', $value);
    }
}
