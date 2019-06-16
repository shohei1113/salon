<?php

namespace App\Repositories\Salon;

use App\Entities\Salon;

/**
 * Interface SalonRepositoryInterface
 * @package App\Repositories\Salon
 */
interface SalonRepositoryInterface
{
    /**
     * @param $categoryId
     * @return mixed
     */
    public function fetchSalonList($categoryId);

    /**
     * @param $id
     * @param $attribute
     * @param $stripePlan
     * @return mixed
     */
    public function createSalon($id, $attribute, $stripePlan);

    /**
     * @param $salon
     * @param $attribute
     * @return mixed
     */
    public function createSalonDetail(Salon $salon, $attribute);

    /**
     * @param $id
     * @return mixed
     */
    public function fetchSalonById($id);

    /**
     * @param $id
     * @param $attribute
     * @return mixed
     */
    public function updateSalon($id, $attribute);

    /**
     * @param $salon
     * @param $attribute
     * @return mixed
     */
    public function updateSalonDetail(Salon $salon, $attribute);
}
