<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

/**
 * Class SalonResource
 * @package App\Http\Resources
 */
class SalonResource extends JsonResource
{
    /**
     * @var
     */
    private $message;

    /**
     * SalonResource constructor.
     * @param $resource
     * @param $message
     */
    public function __construct($resource, $message)
    {
        parent::__construct($resource);
        $this->message = $message;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'salon' => [
                'id' => $this->id,
                'owner' => new UserResource($this->owner),
                'category' => new CategoryResource($this->category),
                'title' => $this->title,
                'description' => $this->description,
                'price' => $this->price,
                'plan_id' => $this->plan_id,
                'product_id' => $this->product_id,
                'salon_detail' => new SalonDetailResource($this->salon_detail),
                'image_url' => $this->image->image_path ?? NULL,
                'is_member' => $this->is_member,
            ],
        ];
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function with($request)
    {
        return [
            'message' => $this->message,
        ];
    }
}
