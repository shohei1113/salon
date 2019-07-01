<?php
declare(strict_types=1);

namespace App\Entities;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use phpDocumentor\Reflection\Types\Mixed_;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 * @package App\Entities
 */
class User extends Authenticatable implements JWTSubject
{
    use SoftDeletes, Billable, MustVerifyEmail, Notifiable;

    const REGISTERED_USER = 1;
    const NOT_REGISTERED_USER = 0;

    /**
     * @var string
     */
    public $token;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
        'email_verified', 'email_verify_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
    public function salons(): BelongsToMany
    {
        return $this->belongsToMany(Salon::class, 'user_salon');
    }

    /**
     * @param $query
     * @param $token
     * @return Builder
     */
    public function scopeSearchEmailVerifyToken($query, $token): Builder
    {
        if (!empty($token)) {
            return $query->where('email_verify_token', $token);
        }
        return $query;
    }

    /**
     * @param $query
     * @param $email
     * @return Builder
     */
    public function scopeSearchEmail($query, $email): Builder
    {
        if (!empty($email)) {
            return $query->where('email', $email);
        }
        return $query;
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims(): array
    {
        return [];
    }
}
