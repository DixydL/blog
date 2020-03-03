<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\PostResource;
use App\Model\Post;
use Illuminate\Http\Request;

class PostCatalogController {
    /**
     * @param Request $request
     * @param Post $post
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Post $post){
        return PostResource::collection(
            $post->catalog()->get()
        );
    }
}