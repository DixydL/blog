<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Controllers\Controller;
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
        $postsData['posts'] = $this->postService->index(Auth::guard('api')->user());
        $postsData['user_name'] = $user->name;

        return new JsonResource(
            $postsData
        );
    }
}
