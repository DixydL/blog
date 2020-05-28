<?php

namespace App\Http\Resources;

use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $file = new FileResource($this->file()->first());
        $comment = new CommentCollection($this->comments()->get());
        return [
            'id' => $this->id,
            'name' => $this->name,
            'content' => $this->content,
            'comments' => $comment,
            'user_id' => $this->user_id,
            'user_name' => $this->name,
            'comments_count' => $comment->count(),
            'file' => $file,
            'file_url' => $file->toArray($request)['url'],
            'catalog_id' => $this->catalog_id,
            'created_at' => $this->created_at,
        ];
    }
}
