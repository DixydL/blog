<?php

namespace App\Data\Art;

use Spatie\DataTransferObject\DataTransferObject;

class ArtRequest extends DataTransferObject
{
    public string $name;

    public string $description;

    public array $tags;

    public array $images;

    public function fromRequest($request): self
    {
        return new self([
            'name' => $request,
            'description' => $request,
            'tags' => $request,
            'image' => $request
        ]);
    }
}
