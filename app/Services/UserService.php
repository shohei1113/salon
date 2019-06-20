<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Image;
use App\Entities\User;
use App\Repositories\Image\ImageRepository;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Http\UploadedFile;
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
     * @var S3Service
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
     * @param int $id
     * @param array $attribute
     * @param UploadedFile $image
     * @return User
     * @throws Exception
     */
    public function updateUser(int $id, array $attribute, ?UploadedFile $image): User
    {
        DB::beginTransaction();
        try {
            $user = $this->user->update($id, $attribute);
            if (!empty($image)) {
                $imagePath = $this->s3Service->uploadImage($image);
                $this->image->updateImage($user->id, $imagePath, Image::TYPE_USER);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }

        return $user;
    }

    /**
     * @param int $id
     * @return User
     */
    public function fetchUserById(int $id): User
    {
        return $this->user->fetchUserById($id);
    }
}