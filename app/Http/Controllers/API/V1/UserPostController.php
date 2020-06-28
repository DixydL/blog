<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PaginationParams;
use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\User;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class UserPostController extends Controller
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
    public function index(Request $request, User $user)
    {

        $novels = $user->posts();

        $postsData['posts'] = $this->postService->index($novels, PaginationParams::fromRequest($request));

        $postsData['user_name'] = $user->name;

        $postsData['description'] = $user->description;

        $postsData['user_url_avatar'] = $user->avatar ? $user->avatar->url : null;

        return new JsonResource(
            $postsData
        );
    }
}
