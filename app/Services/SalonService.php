<?php

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
     * @return Salon[]|\Illuminate\Database\Eloquent\Collection
     */
    public function fetchSalonList($categoryId)
    {
        return $this->salon->fetchSalonList($categoryId);
    }

    /**
     * @param $id
     * @param $attribute
     * @return mixed
     * @throws Exception
     */
    public function createSalon($id, $attribute)
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
     * @param $id
     * @return mixed
     */
    public function fetchSalonById($id)
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
     * @param $id
     * @param $attribute
     * @throws Exception
     */
    public function updateSalon($id, $attribute)
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
     * @param $salon
     * @param $attribute
     * @return Plan
     */
    public function updateStripePlan($salon, $attribute)
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