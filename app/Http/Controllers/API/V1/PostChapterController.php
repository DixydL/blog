<?php

namespace App\Http\Controllers\API\V1;

use App\Data\ChapterData;
use App\Http\Controllers\Controller;
use App\Model\Chapter;
use App\Model\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostChapterController extends Controller
{
/**
 * Undocumented function
 *
 * @param Post $post
 * @param Chapter $chapter
 * @return void
 */
    public function show(Post $post, Chapter $chapter)
    {
        return new JsonResource(ChapterData::createFromModel($chapter));
    }

    public function store(Post $post, Request $request)
    {
        $modelChapter = new Chapter();

        $modelChapter->name = $request->name;
        $modelChapter->text = $request->text;
        $modelChapter->post_id = $post->id;

        $modelChapter->save();

        return new JsonResource(ChapterData::createFromModel($modelChapter));
    }
}
