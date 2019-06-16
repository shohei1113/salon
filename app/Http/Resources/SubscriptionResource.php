<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
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

    public function with($request)
    {
        return [
            'message' => $this->message,
        ];
    }

}
