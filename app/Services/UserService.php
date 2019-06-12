<?php

namespace App\Services;

use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class UserService
{
    private $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    public function updateUser($id, Request $request)
    {
        if ($image = $request->hasFile('image')) {
            $imageUrl = $this->uploadImage($image);
        }
    }

    public function uploadImage($image)
    {
        return Storage::disk('s3')->putFile(env('APP_ENV').'/user', $image, 'public');
    }

    /**
     * @param $id
     * @return mixed
     */
    public function fetchUserById($id)
    {
        return $this->user->fetchUserById($id);
    }
}