<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SalonDetailResource extends JsonResource
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
            'id' => $this->id,
            'salon_id' => $this->salon_id,
            'contents' => $this->contents,
            'message' => $this->message,
            'target' => $this->target,
        ];
    }
}
