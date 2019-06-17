<?php

namespace App\Services;

use App\Entities\Image;
use App\Repositories\Image\ImageRepository;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    /**
     * @var ImageRepository
     */
    private $image;

    /**
     * @var UserRepository
     */
    private $user;

    /**
     * @var
     */
    private $s3Service;

    /**
     * UserService constructor.
     * @param ImageRepository $image
     * @param UserRepository $user
     * @param S3Service $s3Service
     */
    public function __construct(
        ImageRepository $image,
        UserRepository $user,
        S3Service $s3Service
    ) {
        $this->image = $image;
        $this->user = $user;
        $this->s3Service = $s3Service;
    }

    /**
     * @param $id
     * @param Request $request
     * @return mixed
     * @throws Exception
     */
    public function updateUser($id, $attribute, $image)
    {
        DB::beginTransaction();
        try {
            $user = $this->user->updateUser($id, $attribute);
            if (!empty($image)) {
                $imagePath = $this->s3Service->uploadImage($image);
                $this->image->updateImage($user, $imagePath, Image::TYPE_USER);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage(), $e->getCode());
        }

        return $user;
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