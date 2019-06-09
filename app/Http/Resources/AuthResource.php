<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthResource extends JsonResource
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
        UserResource::withoutWrapping();
        return [
            'data' => [
                'user' => new UserResource($this),
                'access_token' => $this->token,
                'token_type' => 'bearer',
                'expire_in' => auth('api')->factory()->getTTL(),
            ],
            'message' => $this->message,
        ];
    }
}
