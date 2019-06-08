<?php

namespace App\Entities;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Auth\MustVerifyEmail;

class User extends Authenticatable implements JWTSubject
{
    use MustVerifyEmail, Notifiable;

    const REGISTERED_USER = 1;

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

    /**
     * @param $data
     * @return mixed
     */
    public function createUser($data)
    {
        return $this->create([
            'name' => $data['name'] ?? NULL,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'email_verify_token' => base64_encode($data['email']),
        ]);
    }

    public function fetchUserByToken($token)
    {
        return $this->where('email_verify_token', $token)->first();
    }

    /**
     * @param $data
     * @return bool
     */
    public function updateUser($data)
    {
        return $this->update([
            'name' => $data['name'] ?? NULL,
            'email_verified' => User::REGISTERED_USER,
        ]);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function fetchUserById($id)
    {
        return $this->find($id);
    }
}
