<?php

namespace App\Data;

use App\Model\Comment;
use Carbon\Carbon;
use Spatie\DataTransferObject\DataTransferObject;

class CommentsData extends DataTransferObject
{
    public int $id;

    public string $content;

    public ?string $user_name;

    public Carbon $created_at;

    public static function createFromModel(Comment $comment): self
    {
        return new self([
            'id'      => $comment->id,
            'user_name'    => $comment->user ? $comment->user->name : null,
            'content'    => $comment->content,
            'created_at' => $comment->created_at,
        ]);
    }
}
