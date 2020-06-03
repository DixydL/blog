<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\Model\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class TagNovelController extends Controller
{
    /**
     * @param Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Tag $tag)
    {

        $posts     = $tag->posts()->orderBy('created_at', 'desc')->get();
        $postsData = [];

        foreach ($posts as $post) {
            $postsData[] = PostData::createFromModel($post);
        }

        return new JsonResource(
            $postsData
        );
    }
}
