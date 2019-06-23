<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalonResource extends JsonResource
{
    private $message;

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
                'is_admin' => $this->is_admin,
            ],
        ];
    }

    public function with($request)
    {
        return [
            'message' => $this->message,
        ];
    }
}
