<?php

namespace App\Data;

use App\Model\Post;
use Carbon\Carbon;
use phpDocumentor\Reflection\Types\Self_;
use Spatie\DataTransferObject\DataTransferObject;

class PostData extends DataTransferObject
{
    public int $id;

    public string $name;

    public string $content;

    public $comments;

    public int $comments_count;

    public $file;

    public int $catalog_id;

    public Carbon $created_at;

    public static function createFromModel(Post $post): self
    {
        $comments = [];
        $file = '';

        //if ($post->comments()->exists()) {
            $comments = $post->comments;
        //}

        if($post->file()->exists()){
            $file = $post->file;
        }

        return new self([
            'id'      => $post->id,
            'name'    => $post->name,
            'content' => $post->content,
            'comments' => $comments,
            'comments_count' => $comments->count(),
            'file' => $file,
            'catalog_id' => $post->catalog_id,
            'created_at' => $post->created_at,
        ]);
    }
}