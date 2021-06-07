<?php

namespace App\Data;

use App\Model\Post;
use Spatie\DataTransferObject\DataTransferObject;

class PostViewData extends DataTransferObject
{
    public $comments;
    public $chapters;

    public static function createFromModel(Post $post)
    {
        $commentsData = null;
        $chaptersData = null;
        $symbolCount = null;

        if ($post->comments()->exists()) {
            foreach ($post->comments as $comment) {
                $commentsData[] = CommentsData::createFromModel($comment);
            }
        }

        if ($post->chapters()->exists()) {
            if ($post->cycle) {
                foreach ($post->chapters as $chapter) {
                    $chaptersData[] = [
                        'id' => $chapter->id,
                        'name' => $chapter->name,
                        'created_at' => $chapter->created_at->format('Y-m-d'),
                    ];
                }
            } else {
                $symbolCount +=iconv_strlen($post->chapters[0]->text);
                $chaptersData[] = [
                    'id' => $post->chapters[0]->id,
                    'name' => $post->chapters[0]->name,
                    'content' => $post->chapters[0]->text,
                    'created_at' => $post->chapters[0]->created_at->format('Y-m-d'),
                ];
            }
        }

        return new self([
            'comments' => $commentsData,
            'chapters' => $chaptersData
        ]);
    }
}
