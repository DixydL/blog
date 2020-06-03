<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPostController extends Controller
{
    /**
     * @param Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(User $user)
    {

        $posts     = $user->posts()->orderBy('created_at', 'desc')->get();
        $postsData = [];

        foreach ($posts as $post) {
            $postsData['posts'][] = PostData::createFromModel($post);
        }

        $postsData['user_name'] = $user->name;

        return new JsonResource(
            $postsData
        );
    }
}
