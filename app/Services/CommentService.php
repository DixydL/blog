<?php

namespace App\Services;

use App\Data\CommentsData;
use App\Model\Comment;

class CommentService
{
    public function create($request): CommentsData
    {
        $comment = new Comment();
        $comment->content = (string)$request->content;
        $comment->author = "deleted";
        $comment->post_id = (int)$request->post_id;
        $comment->user_id = (int)$request->user_id;
        $comment->parent_id = $request->parent_id ? (int)$request->parent_id : null;
        $comment->save();

        return CommentsData::createFromModel($comment);
    }
}
