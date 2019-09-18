<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\CatalogCollection;
use App\Http\Resources\CatalogResource;
use App\Http\Resources\PostResource;
use App\Model\Catalog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CatalogPostController extends Controller
{
    /**
     * @param Request $request
     * @param Catalog $catalog
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Catalog $catalog){
        return PostResource::collection(
            $catalog->posts()->get()
        );
    }
}
