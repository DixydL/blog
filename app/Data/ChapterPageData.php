<?php

namespace App\Data;

use App\Model\Chapter;
use Spatie\DataTransferObject\DataTransferObject;

class ChapterPageData extends DataTransferObject
{
    public int $id;

    public string $name;

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
        ]);
    }
}
