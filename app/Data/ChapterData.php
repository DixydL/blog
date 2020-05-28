<?php

namespace App\Data;

use App\Model\Chapter;
use Spatie\DataTransferObject\DataTransferObject;

class ChapterData extends DataTransferObject
{
    public int $id;

    public string $name;

    public string $text;

    public string $created_at;

        /**
     * Undocumented function
     *
     * @param Chapter $chapter
     * @return self
     */
    public static function createFromModel(Chapter $chapter): self
    {
        return new self([
            'id' => $chapter->id,
            'name' => $chapter->name,
            'text' => $chapter->text,
            'created_at' => $chapter->created_at->format('M d Y'),
        ]);
    }
}
