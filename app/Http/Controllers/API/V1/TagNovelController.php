<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PaginationParams;
use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\Model\Tag;
use App\Services\PostService;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Post;

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
    public function index(Request $request, Tag $tag)
    {

        $novelQuery     = $tag->posts();

        $postsData = $this->postService->index($novelQuery, $request, PaginationParams::fromRequest($request));

        return new JsonResource(
            $postsData
        );
    }
}
