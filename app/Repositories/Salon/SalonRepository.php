<?php

namespace App\Repositories\Salon;

use App\Entities\Salon;

/**
 * Class SalonRepository
 * @package App\Repositories\Salon
 */
class SalonRepository implements SalonRepositoryInterface
{
    private $salon;

    public function __construct(Salon $salon)
    {
        $this->salon = $salon;
    }

    public function createSalon($user, $attribute, $stripePlan)
    {
        return $this->salon->create([
            'owner_id' => $user->id,
            'category_id' => $attribute['category_id'],
            'title' => $attribute['title'],
            'description' => $attribute['description'],
            'price' => $attribute['price'],
            'plan_id' => $stripePlan->id,
            'product_id' => $stripePlan->product,
        ]);
    }
}
