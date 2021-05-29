<?php

namespace App\Http\Controllers\API\V1;

use App\Data\ArtData;
use App\Data\PaginationParams;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Model\Art;
use App\Services\ArtService;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Auth\Access\Response;

class ArtController extends Controller
{

    public ArtService $artService;

    public function __construct(ArtService $artService)
    {
        $this->artService = $artService;
    }

    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {

        $artQuery = Art::query();
        $artsData = $this->artService->index($artQuery, PaginationParams::fromRequest($request));

        return new JsonResource(
            $artsData
        );
    }

    /**
     * @param Request $request
     * @return
     */
    public function store(Request $request)
    {
        $artService = new ArtService();

        $request->request->add(['user_id' => Auth::user()->id]);
        return new JsonResource($artService->create($request));
    }


    /**
     *
     * @param Request $request
     * @param Post $post
     * @return JsonResource
     */
    public function update(Art $art, Request $request)
    {
        $user = Auth::user();

        if ($user->can('update', $art)) {
            $artService = new ArtService;
            $request->request->add(['user_id' => Auth::user()->id]);
            return new JsonResource($artService->update($request, $art));
        } else {
            return response()->json("Дія не можлива", 400);
        }
    }

        /**
     * @param  Art  $post
     *
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Art $art)
    {
        $user = Auth::user();

        if ($user->can('delete', $art)) {
            $art->delete();
        } else {
            return Response::deny('У вас не достатньо прав');
        }

        return response()->noContent();
    }

    /**
     * @param  Art  $art
     *
     * @return JsonResource
     */
    public function show(Art $art)
    {
        return new JsonResource(ArtData::createFromModel($art));
    }
}
