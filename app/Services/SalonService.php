<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Image;
use App\Entities\Salon;
use App\Repositories\Salon\SalonRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Stripe\Plan;
use Stripe\Stripe;
use Exception;
use Illuminate\Support\Facades\DB;

/**
 * Class SalonService
 * @package App\Services
 */
class SalonService
{
    /**
     * @var SalonRepository
     */
    private $salonRepository;

    /**
     * @var ImageService
     */
    private $imageService;
    /**
     * @var S3Service
     */
    private $s3Service;

    /**
     * SalonService constructor.
     * @param SalonRepository $salon
     * @param S3Service $s3Service
     */
    public function __construct(
        SalonRepository $salonRepository,
        ImageService $imageService,
        S3Service $s3Service
    ) {
        $this->salonRepository = $salonRepository;
        $this->imageService = $imageService;
        $this->s3Service = $s3Service;
    }

    /**
     * @return Collection
     */
    public function fetchSalonList(?int $categoryId): Collection
    {
        return $this->salonRepository
            ->fetchSalonList($categoryId)
            ->sortByDesc('created_at');
    }

    /**
     * @param int $userId
     * @param array $attribute
     * @param UploadedFile|null $image
     * @return Salon
     * @throws Exception
     */
    public function createSalon(int $userId, array $attribute, ?UploadedFile $image): Salon
    {
        DB::beginTransaction();
        try {
            $stripePlan = $this->createStripePlan($attribute);
            $salon = $this->salonRepository->create($userId, $attribute, $stripePlan);
            $this->salonRepository->createSalonDetail($salon, $attribute);
            $this->imageService->upload($image, $salon->id, Image::S3_DIR_SALON, Image::TYPE_SALON);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e);
        }

        return $salon;
    }

    /**
     * @param int $id
     * @return Salon
     */
    public function fetchSalonById(int $id): Salon
    {
        return $this->salonRepository->fetchSalonById($id);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @param UploadedFile|null $image
     * @return Salon
     * @throws Exception
     */
    public function updateSalon(int $id, array $attribute, ?UploadedFile $image): Salon
    {
        DB::beginTransaction();
        try {
            $salon = $this->salonRepository->update($id, $attribute);
            $this->salonRepository->updateSalonDetail($salon, $attribute);
            $this->updateStripePlan($salon, $attribute);
            $this->imageService->upload($image, $salon->id, Image::S3_DIR_SALON, Image::TYPE_SALON);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('error');
        }

        return $salon;
    }

    /**
     * @param int $id
     * @return Salon
     * @throws Exception
     */
    public function deleteSalon(int $id): Salon
    {
        return $this->salonRepository->delete($id);
    }

    /**
     * @param $data
     * @return Plan
     */
    public function createStripePlan($attribute)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        return Plan::create([
            'id' => uniqid(strval(mt_rand())),
            'amount' => $attribute['price'],
            'interval' => Salon::PAYMENT_INTERVAL,
            'product' => [
                'name' => $attribute['title'],
            ],
            'nickname' => $attribute['title'],
            'currency' => Salon::CURRENCY,
        ]);
    }

    /**
     * @param Salon $salon
     * @param array $attribute
     * @return Plan
     */
    public function updateStripePlan(Salon $salon, array $attribute): Plan
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        return Plan::update(
            $salon->plan_id,
            [
                'nickname' => $attribute['title'],
            ]
        );
    }
}