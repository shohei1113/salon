<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class CategoryResource
 * @package App\Http\Resources
 */
class CategoryResource extends JsonResource
{
    /**
     * @var string
     */
    private $message;

    /**
     * CategoryResource constructor.
     * @param $resource
     * @param string $message
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
