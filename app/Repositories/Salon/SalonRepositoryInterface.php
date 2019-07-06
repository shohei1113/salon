<?php
declare(strict_types=1);

namespace App\Repositories\Salon;

use App\Entities\Salon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Stripe\Plan;

/**
 * Interface SalonRepositoryInterface
 * @package App\Repositories\Salon
 */
interface SalonRepositoryInterface
{
    /**
     * @param int|null $categoryId
     * @return Collection
     */
    public function fetchSalonList(int $categoryId): Collection;

    /**
     * @param int $userId
     * @param array $attribute
     * @param Plan $stripePlan
     * @return Salon
     */
    public function create(int $userId, array $attribute, Plan $stripePlan): Salon;

    /**
     * @param Salon $salon
     * @param array $attribute
     * @return Model
     */
    public function createSalonDetail(Salon $salon, array $attribute): Model;

    /**
     * @param int $id
     * @return Salon
     */
    public function fetchSalonById(int $id): Salon;

    /**
     * @param int $id
     * @param array $attribute
     * @return Salon
     */
    public function update(int $id, array $attribute): Salon;

    /**
     * @param Salon $salon
     * @param array $attribute
     * @return int
     */
    public function updateSalonDetail(Salon $salon, array $attribute): int;

    /**
     * @param int $id
     * @return Salon
     */
    public function delete(int $id): Salon;
}
