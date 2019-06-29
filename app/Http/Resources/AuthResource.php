<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class AuthResource
 * @package App\Http\Resources
 */
class AuthResource extends JsonResource
{
    /**
     * @var
     */
    private $message;

    /**
     * AuthResource constructor.
     * @param $resource
     * @param $message
     */
    public function __construct($resource, $message = '')
    {
        parent::__construct($resource);
        $this->message = $message;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'data' => [
                'id' => $this->id,
                'user' => new UserResource($this),
                'access_token' => $this->token,
                'token_type' => 'bearer',
                'expire_in' => auth('api')->factory()->getTTL(),
            ],
            'message' => $this->message,
        ];
    }
}
