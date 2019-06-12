<?php

namespace App\Services;

use App\Entities\Image;
use App\Repositories\Image\ImageRepository;
use App\Repositories\User\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    /**
     * @var UserRepository
     */
    private $user;

    /**
     * UserService constructor.
     * @param ImageRepository $image
     * @param UserRepository $user
     */
    public function __construct(ImageRepository $image, UserRepository $user)
    {
        $this->image = $image;
        $this->user = $user;
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     * @throws Exception
     */
    public function updateUser($id, Request $request)
    {
        $data = $request->all();

        DB::beginTransaction();
        try {
            $user = $this->user->updateUser($id, $data);
            if ($request->hasFile('image')) {
                $imagePath = $this->uploadImage($request->image);
                $type = Image::TYPE_USER;
                $this->image->updateImage($user, $imagePath, $type);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage(), $e->getCode());
        }

        return $user;
    }

    /**
     * @param $image
     * @return false|string
     */
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