<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class BaseResource
 * @package App\Http\Resources
 */
class BaseResource extends JsonResource
{
    /**
     * @var
     */
    private $message;

    /**
     * BaseResource constructor.
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
            'data' => $this->resource,
            'message' => $this->message,
        ];
    }
}
