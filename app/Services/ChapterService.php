<?php

namespace App\Services;

use App\Data\ChapterData;
use App\Data\ChapterPageData;
use App\Data\ChapterViewData;
use App\Model\Chapter;
use App\Model\Post;

class ChapterService
{
    public function index(Post $post, Chapter $chapter) : ChapterViewData
    {
        $nextChapter = null;
        $previousChapter = null;

        $chapters = $post->chapters;

        $keyCurrent = $chapters->search(function ($item, $key) use ($chapter) {
            return $item->id == $chapter->id;
        });

        if (isset($chapters[$keyCurrent+1])) {
            $nextChapter = ChapterPageData::createFromModel($chapters[$keyCurrent+1]);
        }

        if ($keyCurrent !== 0 && isset($chapters[$keyCurrent-1])) {
            $previousChapter = ChapterPageData::createFromModel($chapters[$keyCurrent-1]);
        }

        return ChapterViewData::createFromModel($chapter, $nextChapter, $previousChapter);
    }
}
