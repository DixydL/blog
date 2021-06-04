<?php

namespace App\Services;

use App\Data\Likes\LikeData;
use App\Data\PaginationData;
use App\Data\PaginationParams;
use App\Data\PostData;
use App\Http\Resources\NovelCollection;
use App\Http\Resources\PostCollection;
use App\Model\Chapter;
use App\Model\Tag;
use App\Model\Post;
use App\User;
use Illuminate\Http\Request;

class PostService
{

    public function index($novelQuery, Request $request, PaginationParams $paginationParams)
    {
        if ($request->type) {
            $novelQuery->where('type', $request->type);
        }

        $novels = $novelQuery->orderBy('created_at', 'desc')->paginate($paginationParams->perPage);
        $colection = new NovelCollection($novels);

        return new PaginationData($colection->resolve());
    }

    /**
     * Undocumented function
     *
     * @param [type] $request
     * @param Post $modelPost
     * @return PostData
     */
    public function update($request, $modelPost) : PostData
    {

        $modelPost->name = $request->name;
        //$modelPost->user_id = $request->user_id;
        $modelPost->description = $request->description;
        $modelPost->type = $request->type;
        $modelPost->save();

        $modelTagsIds = [];

        foreach ($request->dynamicTags as $tag) {
            $modelTag = Tag::where(['name' => $tag])->first();

            if ($modelTag === null) {
                $modelTag = new Tag();
                $modelTag->name = $tag;
                $modelTag->save();
            }
            $modelTagsIds[] = $modelTag->id;
        }
        $modelPost->tags()->sync($modelTagsIds);

        return PostData::createFromModel($modelPost);
    }

    public function create($request) : PostData
    {
        $modelPost = new Post();

        $modelPost->name = $request->name;
        $modelPost->type = (int)$request->type;
        $modelPost->cycle = (bool)$request->cycle;
        $modelPost->user_id = $request->user_id;
        $modelPost->description = $request->description;
        $modelPost->save();

        $modelTagsIds = [];

        foreach ($request->dynamicTags as $tag) {
            $modelTag = Tag::where(['name' => $tag])->first();

            if ($modelTag === null) {
                $modelTag = new Tag();
                $modelTag->name = $tag;
                $modelTag->save();
            }
            $modelTagsIds[] = $modelTag->id;
        }

        $modelPost->tags()->sync($modelTagsIds);


        foreach ($request->chapters as $chapter) {
            $modelChapter = new Chapter;
            $modelChapter->name = $chapter['name'] ?? "chapter 1";
            $modelChapter->text = $chapter['content'];
            $modelChapter->post_id = $modelPost->id;
            $modelChapter->save();
        }

        return PostData::createFromModel($modelPost);
    }
}
