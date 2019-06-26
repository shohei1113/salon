<?php
declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class SubscriptionResource
 * @package App\Http\Resources
 */
class SubscriptionResource extends JsonResource
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
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'subscription' => [
                'id' => $this->id,
                'name' => $this->name,
                'stripe_id' => $this->stripe_id,
                'stripe_plan' => $this->stripe_plan,
                'quantity' => $this->quantity,
                'trial_ends_at' => $this->trial_ends_at,
                'ends_at' => $this->ends_at,
                'user' => new UserResource($this->user),
            ]
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
