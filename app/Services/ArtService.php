<?php

namespace App\Services;

use App\Data\Art\ArtRequest;
use App\Model\Art;

class ArtService
{
    public function create(ArtRequest $artData)
    {
        $art = new Art();
        $art->fill([
            'name' => $artData->name,
            'description' => $artData->description,
        ]);

        $art->save();
    }
}
