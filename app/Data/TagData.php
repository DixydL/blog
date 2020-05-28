<?php

namespace App\Data;

use App\Model\Tag;
use Spatie\DataTransferObject\DataTransferObject;

class TagData extends DataTransferObject
{

    public int $id;

    public string $name;

    public ?string $description;

    /**
     * Undocumented function
     *
     * @param Tag $tag
     * @return self
     */
    public static function createFromModel(Tag $tag): self
    {
        return new self([
            'id' => $tag->id,
            'name' => $tag->name,
            'description' => $tag->description
        ]);
    }
}
