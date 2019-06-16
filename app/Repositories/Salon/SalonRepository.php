<?php

namespace App\Repositories\Salon;

use App\Entities\Salon;

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
     * @param $categoryId
     * @return Salon[]|\Illuminate\Database\Eloquent\Collection|mixed
     */
    public function fetchSalonList($categoryId)
    {
        if (!empty($categoryId)) {
            return $this->salon->searchCategory($categoryId)->get();
        }

        return $this->salon->all();
    }

    /**
     * @param $user
     * @param $attribute
     * @param $stripePlan
     * @return mixed
     */
    public function createSalon($id, $attribute, $stripePlan)
    {
        return $this->salon->create([
            'owner_id' => $id,
            'category_id' => $attribute['category_id'],
            'title' => $attribute['title'],
            'description' => $attribute['description'],
            'price' => $attribute['price'],
            'plan_id' => $stripePlan->id,
            'product_id' => $stripePlan->product,
        ]);
    }

    /**
     * @param $salon
     * @param $attribute
     * @return mixed
     */
    public function createSalonDetail(Salon $salon, $attribute)
    {
        return $salon->salon_detail()->create($attribute);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function fetchSalonById($id)
    {
        return $this->salon->find($id);
    }

    /**
     * @param $id
     * @param $attribute
     * @return mixed
     */
    public function updateSalon($id, $attribute)
    {
        $salon = $this->salon->find($id);
        $this->salon->update($attribute);
        return $salon;
    }

    /**
     * @param Salon $salon
     * @param $attribute
     * @return int|mixed
     */
    public function updateSalonDetail(Salon $salon, $attribute)
    {
        return $salon->salon_detail()->update([
            'contents' => $attribute['contents'],
            'message' => $attribute['message'],
            'target' => $attribute['target'],
        ]);
    }
}
