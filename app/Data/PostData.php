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

    public string $type;

    public bool $cycle;

    public string $name;

    public ?string $description;

    public $tags;

    public int $user_id;

    public int $comments_count;

    public int $likes_count;

    public int $chapters_count = 0;

    public ?string $user_name;

    public ?string $user_url_avatar;

    public $file;

    public Carbon $created_at;

    public ?LikeData $like;

    public ?NovelCacheData $cache;

    public ?PostViewData $view;

    public static function createFromModel(Post $post, $isView = false): self
    {
        $tagsData = [];
        $userUrlAvatar = null;
        $postViewData = null;

        if ($isView) {
            $postViewData = PostViewData::createFromModel($post);
        }

        if ($post->tags()->exists()) {
            foreach ($post->tags as $tag) {
                $tagsData[] = TagData::createFromModel($tag);
            }
        }

        if ($post->user && $post->user->avatar) {
            $userUrlAvatar = $post->user->avatar->url_resize;
        }

        return new self([
            'id'      => $post->id,
            'name'    => $post->name,
            'type'    => (string)$post->type,
            'cycle'    => (bool)$post->cycle,
            'description' => $post->description,
            'tags' => $tagsData,
            'view' => $postViewData,
            'user_id' => $post->user_id,
            'user_name' => $post->user? $post->user->name : null,
            'user_url_avatar' => $userUrlAvatar,
            'comments_count' => $post->comments()->count(),
            'likes_count' => $post->usersLikes()->count(),
            'created_at' => $post->created_at,
            'like' => $post->isLike(),
            'cache' => new NovelCacheData([
                    'chaptersSymbolCounter' => $post->cache->chaptersSymbolCounter ?? 0,
                    'chaptersCount' => $post->cache->chaptersCount ?? 0
                ])
        ]);
    }
}
