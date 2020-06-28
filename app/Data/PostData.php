<?php

namespace App\Data;

use App\Data\Likes\LikeData;
use App\Helper\Symbol;
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

    public int $likes_count;

    public int $chapters_count;

    public string $symbol_count;

    public ?string $user_name;

    public ?string $user_url_avatar;

    public $file;

    public Carbon $created_at;

    public ?LikeData $like;

    public static function createFromModel(Post $post): self
    {
        $commentsData = [];
        $tagsData = [];
        $chaptersData = [];
        $symbolCount = 0;
        $userUrlAvatar = null;

        if ($post->comments()->exists()) {
            foreach ($post->comments as $comment) {
                $commentsData[] = CommentsData::createFromModel($comment);
            }
        }

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
                $symbolCount +=iconv_strlen($chapter->text);
                $chaptersData[] = [
                    'id' => $chapter->id,
                    'name' => $chapter->name,
                    'created_at' => $chapter->created_at->format('Y-m-d'),
                ];
            }
        }

        if ($post->user && $post->user->avatar) {
            $userUrlAvatar = $post->user->avatar->url_resize;
        }

        return new self([
            'id'      => $post->id,
            'name'    => $post->name,
            'description' => $post->description,
            'tags' => $tagsData,
            'chapters' => $chaptersData,
            'user_id' => $post->user_id,
            'user_name' => $post->user? $post->user->name : null,
            'user_url_avatar' => $userUrlAvatar,
            'comments' => $commentsData,
            'comments_count' => $post->comments()->count(),
            'likes_count' => $post->usersLikes()->count(),
            'chapters_count' => count($chaptersData),
            'symbol_count' => Symbol::chapterSymbolCount($symbolCount),
            'created_at' => $post->created_at,
            'like' => $post->isLike()
        ]);
    }
}
