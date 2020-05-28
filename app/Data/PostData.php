<?php

namespace App\Data;

use App\Model\Post;
use Carbon\Carbon;
use Spatie\DataTransferObject\DataTransferObject;

class PostData extends DataTransferObject
{
    public int $id;

    public string $name;

    public ?string $description;

    public $comments;

    public $tags;

    public $chapters;

    public int $user_id;

    public int $comments_count;

    public int $chapters_count;

    public ?string $user_name;

    public $file;

    public Carbon $created_at;

    public static function createFromModel(Post $post): self
    {
        $comments = [];
        $tagsData = [];
        $chaptersData = [];
        //$file = '';

        //if ($post->comments()->exists()) {
            $comments = $post->comments;
        //}

       // if($post->file()->exists()){
            $file = $post->file;
        //}

        if ($post->tags()->exists()) {
            foreach ($post->tags as $tag) {
                $tagsData[] = TagData::createFromModel($tag);
            }
        }


        if ($post->chapters()->exists()) {
            foreach ($post->chapters as $chapter) {
                $chaptersData[] = [
                    'id' => $chapter->id,
                    'name' => $chapter->name,
                    //'text' => $chapter->text,
                    'created_at' => $chapter->created_at->format('Y-m-d'),
                ];
            }
        }

        return new self([
            'id'      => $post->id,
            'name'    => $post->name,
            'description' => $post->description,
            'tags' => $tagsData,
            'chapters' => $chaptersData,
            'user_id' => $post->user_id,
            'user_name' => $post->user? $post->user->name : null,
            'comments' => $comments,
            'comments_count' => $comments->count(),
            'chapters_count' => count($chaptersData),
            'created_at' => $post->created_at,
        ]);
    }
}
