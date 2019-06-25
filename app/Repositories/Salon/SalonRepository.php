<?php
declare(strict_types=1);

namespace App\Repositories\Salon;

use App\Entities\Salon;
use App\Entities\SalonDetail;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Stripe\Plan;

/**
 * Class SalonRepository
 * @package App\Repositories\Salon
 */
class SalonRepository implements SalonRepositoryInterface
{
    /**
     * @var Salon
     */
    private $salon;

    /**
     * SalonRepository constructor.
     * @param Salon $salon
     */
    public function __construct(Salon $salon)
    {
        $this->salon = $salon;
    }

    /**
     * @param int|null $categoryId
     * @return Collection
     */
    public function fetchSalonList(?int $categoryId): Collection
    {
        return $this->salon->searchCategory($categoryId)->get();
    }

    /**
     * @param int $userId
     * @param array $attribute
     * @param Plan $stripePlan
     * @return Salon
     */
    public function createSalon(int $userId, array $attribute, Plan $stripePlan): Salon
    {
        return $this->salon->create([
            'owner_id' => $userId,
            'category_id' => $attribute['category_id'],
            'title' => $attribute['title'],
            'description' => $attribute['description'],
            'price' => $attribute['price'],
            'plan_id' => $stripePlan->id,
            'product_id' => $stripePlan->product,
        ]);
    }

    /**
     * @param Salon $salon
     * @param array $attribute
     * @return Model
     */
    public function createSalonDetail(Salon $salon, array $attribute): Model
    {
        return $salon->salon_detail()->create($attribute);
    }

    /**
     * @param int $id
     * @return Salon
     */
    public function fetchSalonById(int $id): Salon
    {
        return $this->salon->find($id);
    }

    /**
     * @param int $id
     * @param array $attribute
     * @return Salon
     */
    public function updateSalon(int $id, array $attribute): Salon
    {
        $salon = $this->salon->find($id);
        $salon->update($attribute);
        return $salon;
    }

    /**
     * @param Salon $salon
     * @param array $attribute
     * @return int
     */
    public function updateSalonDetail(Salon $salon, array $attribute): int
    {
        return $salon->salon_detail()->update([
            'contents' => $attribute['contents'],
            'message' => $attribute['message'],
            'target' => $attribute['target'],
        ]);
    }
}
