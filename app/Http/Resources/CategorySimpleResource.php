<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategorySimpleResource extends JsonResource
{
    /**
     * @var
     */
    private $message;

    /**
     * SalonSimpleResource constructor.
     * @param $resource
     * @param $message
     */
    public function __construct($resource, $message='')
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
            'category' => [
                'id' => $this->id,
                'name' => $this->name,
                'description' => $this->description,
                'image_url' => $this->image->image_path ?? NULL,
                'salons' => SalonShowResource::collection($this->salons),
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
