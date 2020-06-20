<?php

namespace App\Data\Likes;

use Spatie\DataTransferObject\DataTransferObject;

class LikeData extends DataTransferObject
{
    public ?int $post_id;

    public ?int $user_id;

    public bool $isLike;

    /**
     * Undocumented function
     *
     * @param Chapter $chapter
     * @return self
     */
    public static function createData(bool $isLike, ?int $post_id = null, ?int $user_id = null): self
    {
        return new self([
            'post_id' => $post_id,
            'user_id' => $user_id,
            'isLike' => $isLike,
        ]);
    }
}
