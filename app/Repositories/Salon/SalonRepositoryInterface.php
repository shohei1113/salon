<?php

namespace App\Repositories\Salon;

/**
 * Interface SalonRepositoryInterface
 * @package App\Repositories\Salon
 */
interface SalonRepositoryInterface
{
    public function createSalon($user, $attribute, $stripePlan);
}
