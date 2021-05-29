<?php

namespace App\Services;

use App\Data\ArtData;
use App\Data\PaginationData;
use App\Data\PaginationParams;
use App\Data\PostData;
use App\Http\Resources\ArtCollection;
use App\Model\Art;
use App\Model\Tag;
use App\Model\Post;
use Storage;

class ArtService
{

    public function index($artQuery, PaginationParams $paginationParams)
    {
        $arts = $artQuery->orderBy('created_at', 'desc')->paginate(24);
        $colection = new ArtCollection($arts);

        return new PaginationData($colection->resolve());
    }

    /**
     * @param Art $modelPost
     * @return ArtData
     */
    public function update($request, Art $modelArt) : ArtData
    {

        $modelArt->name = $request->name;
        $modelArt->signature = $request->signature;
        $modelArt->save();

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
        $modelArt->tags()->sync($modelTagsIds);
        $modelArt->images()->sync($request->images_id);

        return ArtData::createFromModel($modelArt);
    }

    public function create($request) : ArtData
    {
        $modelArt = new Art();

        $modelArt->name = $request->name;
        $modelArt->user_id = $request->user_id;
        $modelArt->signature = $request->signature;
        $modelArt->save();


        //Перенести в окремий метод
        $image = \Image::make(file_get_contents($request->cover_image))
            ->resize(500, 500);

        $image->stream("jpg", 90);
        Storage::disk('public')->put('cover/' . "$modelArt->id.jpg", $image);
        $modelArt->cover_image = "/storage/cover/$modelArt->id.jpg";
        $modelArt->save();

        ////

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

        $modelArt->tags()->sync($modelTagsIds);
        $modelArt->images()->sync($request->images_id);

        return ArtData::createFromModel($modelArt);
    }
}
