<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Image;
use App\Entities\User;
use App\Mail\EmailVerification;
use App\Repositories\ChangeEmail\ChangeEmailRepository;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var ChangeEmailRepository
     */
    private $changeEmailRepository;

    /**
     * @var ImageService
     */
    private $imageService;

    /**
     * @var S3Service
     */
    private $s3Service;

    /**
     * UserService constructor.
     * @param UserRepository $userRepository
     * @param ChangeEmailRepository $changeEmailRepository
     * @param ImageService $imageService
     * @param S3Service $s3Service
     */
    public function __construct(
        UserRepository $userRepository,
        ChangeEmailRepository $changeEmailRepository,
        ImageService $imageService,
        S3Service $s3Service
    ) {
        $this->userRepository = $userRepository;
        $this->changeEmailRepository = $changeEmailRepository;
        $this->imageService = $imageService;
        $this->s3Service = $s3Service;
    }

    /**
     * @param int $id
     * @param array $attribute
     * @param UploadedFile $image
     * @return User
     * @throws Exception
     */
    public function updateUser(int $id, array $attribute, ?UploadedFile $image=null): User
    {
        DB::beginTransaction();
        try {
            $user = $this->userRepository->update($id, $attribute);
            $this->imageService->upload($image, $user->id, Image::S3_DIR_USER, Image::TYPE_USER);
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
        return $this->userRepository->fetchUserById($id);
    }

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchMemeberSalons(int $id): Collection
    {
        return $this->userRepository->fetchMemberSalons($id);
    }

    /**
     * @param int $id
     * @return Collection
     */
    public function fetchOwnerSalons(int $id): Collection
    {
        return $this->userRepository->fetchOwnerSalons($id);
    }

    /**
     * @param int $id
     * @param string $email
     * @return User
     */
    public function sendMailToChangeEmail(int $id, string $email): User
    {
        $user = $this->userRepository->fetchUserById($id);
        $this->changeEmailRepository->create($id, $email);
        $this->sendMail($user, $email, 'pre_register');
        return $user;
    }

    /**
     * @param User $user
     */
    public function sendMail(User $user, string $email)
    {
        $emailVerify = new EmailVerification($user);
        Mail::to($email)->send($emailVerify);
    }

}