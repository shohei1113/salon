<?php
declare(strict_types=1);

namespace App\Services;

use App\Entities\Salon;
use App\Repositories\Salon\SalonRepository;
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
    private $salon;

    /**
     * SalonService constructor.
     * @param SalonRepository $salon
     */
    public function __construct(SalonRepository $salon)
    {
        $this->salon = $salon;
    }

    /**
     * @param int $categoryId
     * @return Salon
     */
    public function fetchSalonList(int $categoryId): Salon
    {
        return $this->salon->fetchSalonList($categoryId);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Salon
     * @throws Exception
     */
    public function createSalon(int $id, array $attribute): Salon
    {
        DB::beginTransaction();
        try {
            $stripePlan = $this->createStripePlan($attribute);
            $salon = $this->salon->createSalon($id, $attribute, $stripePlan);
            $this->salon->createSalonDetail($salon, $attribute);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            //
        }

        return $salon;
    }

    /**
     * @param int $id
     * @return Plan
     */
    public function fetchSalonById(int $id): Plan
    {
        return $this->salon->fetchSalonById($id);
    }

    /**
     * @param $data
     * @return Plan
     */
    public function createStripePlan($attribute)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        return Plan::create([
            'id' => uniqid(mt_rand()),
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
     * @param int $id
     * @param array $attribute
     * @return Salon
     * @throws Exception
     */
    public function updateSalon(int $id, array $attribute): Salon
    {
        DB::beginTransaction();
        try {
            $salon = $this->salon->updateSalon($id, $attribute);
            $this->salon->updateSalonDetail($salon, $attribute);
            $this->updateStripePlan($salon, $attribute);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            //
        }

        return $salon;
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