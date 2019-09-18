<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\CatalogCollection;
use App\Http\Resources\CatalogResource;
use App\Model\Catalog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CatalogController extends Controller
{
    /**
     * @return CatalogResource
     */
    public function index(): CatalogCollection
    {
        return new CatalogCollection(Catalog::all());
    }

    /**
     * @param Request $request
     * @return CatalogResource
     */
    public function store(Request $request): CatalogResource
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        return new CatalogResource(
            Catalog::create($request->only(['name', 'description']))
        );
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
    public function update(Request $request, Catalog $catalog): CatalogResource
    {
        $request->validate([
            'name' => 'required|max:255',
        ]);

        $catalog->update($request->only(['name', 'description']));
        return new CatalogResource($catalog);
    }

    public function show(Catalog $catalog)
    {
        return new CatalogResource($catalog);
    }

    /**
     * @param Catalog $catalog
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Catalog $catalog)
    {
        $catalog->delete();
        return response()->noContent();
    }

}
