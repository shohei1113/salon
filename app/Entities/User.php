<?php

namespace App\Entities;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 * @package App\Entities
 */
class User extends Authenticatable implements JWTSubject
{
    use Billable, MustVerifyEmail, Notifiable;

    const REGISTERED_USER = 1;

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
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function salons()
    {
        return $this->belongsToMany(Salon::class, 'user_salon');
    }

    /**
     * @param $query
     * @param $token
     * @return mixed
     */
    public function scopeSearchEmailVerifyToken($query, $token)
    {
        if (!empty($token)) {
            return $query->where('email_verify_token', $token);
        }
    }

    /**
     * @param $query
     * @param $email
     * @return mixed
     */
    public function scopeSearchEmail($query, $email)
    {
        if (!empty($email)) {
            return $query->where('email', $email);
        }
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
    public function getJWTCustomClaims()
    {
        return [];
    }
}
