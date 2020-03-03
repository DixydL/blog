<?php

namespace App\Http\Controllers\API\V1;

use App\Data\PostData;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Model\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;

class PostController extends Controller
{

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $posts     = Post::all();
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
    public function store(Request $request): PostResource
    {
        $request->validate([
            'name'       => 'required|max:255',
            'catalog_id' => 'required',
        ]);

        return new PostResource(
            Post::create($request->only(['name', 'content', 'catalog_id', 'file_id']))
        );
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): PostResource
    {
        $request->validate([
            'name'       => 'required|max:255',
            'catalog_id' => 'required',
        ]);

        $post->update($request->only(['name', 'content', 'catalog_id', 'file_id']));

        return new PostResource($post);
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
