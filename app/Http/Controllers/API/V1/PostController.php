<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Model\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return PostResource::collection(
            Post::all()
        );
    }

    /**
     * @param Request $request
     * @return PostResource
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function store(Request $request): PostResource
    {
        $request->validate([
            'name' => 'required|max:255',
            'catalog_id' => 'required'
        ]);

        return new PostResource(
            Post::create($request->only(['name', 'content', 'catalog_id', 'file_id']))
        );
    }

    /**
     * @param Post $post
     * @return PostResource
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post): PostResource
    {
        $request->validate([
            'name' => 'required|max:255',
            'catalog_id' => 'required'
        ]);

        $post->update($request->only(['name', 'content', 'catalog_id', 'file_id']));
        return new PostResource($post);
    }

    /**
     * @param Post $post
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->noContent();
    }
}
