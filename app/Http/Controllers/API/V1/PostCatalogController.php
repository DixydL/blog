<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Resources\PostResource;
use App\Model\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostCatalogController
{
    /**
     * @param Request $request
     * @param Post $post
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Post $post)
    {
        $posts     = Post::orderBy('created_at', 'desc')->get();
        $postsData = [];

        foreach ($posts as $post) {
            $postsData[] = PostData::createFromModel($post);
        }

        return new JsonResource(
            $postsData
        );
    }
}
