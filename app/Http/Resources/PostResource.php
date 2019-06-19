<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'post' => [
                'salon_id' => $this->salon_id,
                'title' => $this->title,
                'content' => $this->content,
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
