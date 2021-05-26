<?php

namespace App\Http\Resources;

use App\Data\ArtData;
use Illuminate\Http\Resources\Json\JsonResource;

class Art extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ArtData::createFromModel($this->resource)->toArray();
    }
}
