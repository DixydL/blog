<?php

namespace App\Data;

use App\Model\Art;
use Carbon\Carbon;
use Spatie\DataTransferObject\DataTransferObject;

class ArtData extends DataTransferObject
{
    public int $id;

    public int $user_id;

    public string $name;

    public string $user_name;

    public ?string $user_url_avatar;

    public ?string $image_url_cover;

    /**
     * @property FileData[]
     */
    public $images = [];

    public string $signature;

    public Carbon $created_at;

    public static function createFromModel(Art $art): self
    {
        $userUrlAvatar = null;
        $imageUrlCover = null;
        $images = [];

        if ($art->user && $art->user->avatar) {
            $userUrlAvatar = $art->user->avatar->url_resize;
        }

        if ($art->images) {
            foreach ($art->images as $image) {
                $images[] = new FileData(['id' => $image->id, 'url' => $image->url]);
            }
        }

        if ($art->cover_image) {
            $imageUrlCover = $art->cover_image;
        }

        return new self([
            'id'      => $art->id,
            'name'    => $art->name,
            'signature' => $art->signature,
            'user_name' => $art->user? $art->user->name : null,
            'image_url_cover' => $imageUrlCover,
            'user_url_avatar' => $userUrlAvatar,
            'images' => $images,
            //'tags' => $tagsData,
            'user_id' => $art->user_id,
            'created_at' => $art->created_at,
        ]);
    }
}
