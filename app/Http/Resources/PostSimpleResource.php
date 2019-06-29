<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class PostSimpleResource
 * @package App\Http\Resources
 */
class PostSimpleResource extends JsonResource
{
    /**
     * @var string
     */
    private $message;

    /**
     * PostSimpleResource constructor.
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
            'post' => new PostResource($this),
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
