<?php

namespace App\Services;

use App\Data\PostData;
use App\Model\Chapter;
use App\Model\Tag;
use App\Model\Post;

class PostService
{
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

        $modelChapter = new Chapter;

        $modelChapter->name = $request->name;
        $modelChapter->text = $request->text;
        $modelChapter->post_id = $modelPost->id;
        $modelChapter->save();

        return PostData::createFromModel($modelPost);
    }
}