<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\Model\Tag;
use App\Services\PostService;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class TagNovelController extends Controller
{
    public PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * @param Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Tag $tag)
    {

        $postsData = $this->postService->index(Auth::guard('api')->user());

        return new JsonResource(
            $postsData
        );
    }
}
