<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\ChangeEmail;
use App\Entities\Image;
use App\Entities\User;
use App\Repositories\ChangeEmail\ChangeEmailRepository;
use App\Repositories\User\UserRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

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
     * @var SESService
     */
    private $sesService;

    /**
     * UserService constructor.
     * @param UserRepository $userRepository
     * @param ChangeEmailRepository $changeEmailRepository
     * @param ImageService $imageService
     * @param S3Service $s3Service
     * @param SESService $sesService
     */
    public function __construct(
        UserRepository $userRepository,
        ChangeEmailRepository $changeEmailRepository,
        ImageService $imageService,
        S3Service $s3Service,
        SESService $sesService
    ) {
        $this->userRepository = $userRepository;
        $this->changeEmailRepository = $changeEmailRepository;
        $this->imageService = $imageService;
        $this->s3Service = $s3Service;
        $this->sesService = $sesService;
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
        $changeEmail = $this->changeEmailRepository->updateOrCreate($id, $email);
        $this->sesService
            ->sendEmailVerifyMail($email, $changeEmail->token, 'email_verify', config('const.email_title.email_reset'));
        return $user;
    }

    /**
     * @param array $attribute
     * @return User
     * @throws Exception
     */
    public function resetEmail(array $attribute): User
    {
        $changeEmail = $this->changeEmailRepository->fetchChangeEmailByToken($attribute['token']);

        if (!isset($changeEmail)) {
            throw new HttpResponseException(
                response()->json(['message' => 'invalid token'], 401)
            );
        }

        if ($changeEmail->status === ChangeEmail::REGISTERED) {
            throw new Exception(
                response()->json(['message' => 'already reset email'], 401)
            );
        }

        DB::beginTransaction();
        try {
            $user = $this->userRepository->updateEmail($changeEmail->user_id, $changeEmail->email);
            $this->changeEmailRepository->registeredEmail($changeEmail->id);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }

        return $user;
    }
}