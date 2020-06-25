<?php

namespace App\Http\Resources;

use App\Data\PostData;
use Illuminate\Http\Resources\Json\JsonResource;

class Novel extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return PostData::createFromModel($this->resource)->toArray();
    }
}
