<?php

namespace App\Services;

use App\Entities\Salon;
use App\Repositories\Salon\SalonRepository;
use Stripe\Plan;
use Stripe\Stripe;

class SalonService
{
    private $salon;

    public function __construct(SalonRepository $salon)
    {
        $this->salon = $salon;
    }

    public function createSalon($user, $attribute)
    {
        $stripePlan = $this->createStripePlan($attribute);
        return $this->salon->createSalon($user, $attribute, $stripePlan);
    }
    
    public function createStripePlan($data)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
        return Plan::create([
            'id' => uniqid(mt_rand()),
            'amount' => $data['price'],
            'interval' => Salon::PAYMENT_INTERVAL,
            'product' => [
                'name' => $data['title'],
            ],
            'currency' => Salon::CURRENCY,
        ]);
    }
}