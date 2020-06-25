<?php

namespace App\Http\Controllers\API\V1;

use App\Data\Likes\LikeData;
use App\Data\PaginationParams;
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
use Illuminate\Auth\Access\Response;
use App\Http\Resources\Likes as LikesResource;
use Mail;

class PostController extends Controller
{

    public PostService $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {

        $novelQuery = Post::query();
        $postsData = $this->postService->index($novelQuery, PaginationParams::fromRequest($request));

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
    }

    /**
     * @param  Post  $post
     *
     * @return JsonResource
     */
    public function show(Post $post)
    {
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
        $user = Auth::user();

        if ($user->can('update', $post)) {
            $postService = new PostService;
            $request->request->add(['user_id' => Auth::user()->id]);
            return new JsonResource($postService->update($request, $post));
        } else {
            return Response::deny('У вас не достатньо прав');
        }
    }

    /**
     * @param  Post  $post
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        $user = Auth::user();

        if ($user->can('delete', $post)) {
            $post->delete();
        } else {
            return Response::deny('У вас не достатньо прав');
        }

        return response()->noContent();
    }

    public function like(Post $novel)
    {
        $user_id = Auth::user()->id;

        if ($novel->usersLikes()->where('id', $user_id)->exists()) {
            $novel->usersLikes()->detach($user_id);
            return new LikesResource(LikeData::createData(false, $novel->id, $user_id));
        }

        $novel->usersLikes()->attach($user_id);
        return new LikesResource(LikeData::createData(true, $novel->id, $user_id));
    }
}
