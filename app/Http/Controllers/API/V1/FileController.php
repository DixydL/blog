<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\FileResource;
use App\Model\File;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

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

    public function profileAvatar(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->file('file')->isValid()) {
            $path = $request->file('file')->store('public/profile/full');

            $image = \Image::make(storage_path('app/' . $path))->resize(80, 80);

            $image->stream();

            Storage::disk('public')->put('profile/80x80/' . basename($path), $image);

            $file = File::create([
                'name' => basename($path),
                'path' => $path,
                'url' => storage::url($path),
                'url_resize' => '/storage/profile/80x80/' . basename($path),
            ]);
            $user = Auth::user();
            $user->avatar_id = $file->id;
            $user->save();

            return new FileResource(
                $file
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
