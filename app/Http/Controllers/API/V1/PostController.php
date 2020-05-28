<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Model\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PostService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Auth;

class PostController extends Controller
{

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
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

    /**
     * @param  Request  $request
     *
     * @return PostResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request)
    {
        $postService = new PostService;

        $request->request->add(['user_id' => Auth::user()->id]);
        return new JsonResource($postService->create($request));

        // $post = Post::create($request->only(['name', 'content', 'catalog_id', 'file_id', 'user_id']));

        // return new JsonResource(PostData::createFromModel($post));
    }

    /**
     * @param  Post  $post
     *
     * @return JsonResource
     */
    public function show(Post $post)
    {
        $user = Auth::user();
        return new JsonResource(PostData::createFromModel($post));
        //return new PostResource($post);
    }


    /**
     * Undocumented function
     *
     * @param Request $request
     * @param Post $post
     * @return JsonResource
     */
    public function update(Post $post, Request $request): JsonResource
    {
        $postService = new PostService;
        $request->request->add(['user_id' => Auth::user()->id]);
        return new JsonResource($postService->update($request, $post));
    }

    /**
     * @param  Post  $post
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->noContent();
    }
}
