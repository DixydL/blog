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

    public ?string $user_url_avatar;

    public ?string $time_post;

    public Carbon $created_at;

    public static function createFromModel(Comment $comment): self
    {
        $userUrlAvatar = null;

        if ($comment->user && $comment->user->avatar) {
            $userUrlAvatar = $comment->user->avatar->url_resize;
        }

        $currentTime = Carbon::now();

        return new self([
            'id'      => $comment->id,
            'user_name'    => $comment->user ? $comment->user->name : null,
            'user_url_avatar'    => $userUrlAvatar,
            'content'    => $comment->content,
            'created_at' => $comment->created_at,
            'time_post' => $comment->timePost(),
        ]);
    }
}
