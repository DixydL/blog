<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\FileResource;
use App\Model\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * @param Request $request
     * @return FileResource
     */
    public function store(Request $request): FileResource
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->file('file')->isValid()) {
            $path = $request->file('file')->store('public/file');
            return new FileResource(
                File::create(['path' => $path])
            );
        }
        return response()->json([], 402);
    }

    public function destroy(File $file)
    {
        Storage::disk()->delete($file->path);
        $file->delete();
        return response()->noContent();
    }
}
