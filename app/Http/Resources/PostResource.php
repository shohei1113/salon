<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class PostResource
 * @package App\Http\Resources
 */
class PostResource extends JsonResource
{
    /**
     * @var string
     */
    private $message;

    /**
     * PostResource constructor.
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
            'id' => $this->id,
            'salon_id' => $this->salon_id,
            'content' => $this->content,
            'image_url' => $this->image->image_path ?? NULL,
            'comments' => CommentResource::collection($this->comment),
            'created_at' => $this->created_at,
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
