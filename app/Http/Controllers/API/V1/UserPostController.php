<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\User;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

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
    public function index(User $user)
    {

        $novels = $user->posts()->orderBy('created_at', 'desc')->get();

        $postsData['posts'] = $this->postService->index($novels, Auth::guard('api')->user());

        $postsData['user_name'] = $user->name;

        return new JsonResource(
            $postsData
        );
    }
}
