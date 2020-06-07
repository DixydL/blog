<?php

namespace App\Http\Controllers\API\V1;

use App\Data\CommentsData;
use App\Http\Resources\CommentCollection;
use App\Http\Resources\CommentResource;
use App\Model\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($post_id) : CommentCollection
    {
        $comments = Comment::where('post_id', $post_id)->get();
        $commentsData = [];

        foreach ($comments as $comment) {
            $commentsData[] = PostData::createFromModel($post);
        }

        return new JsonResource(
            $commentsData
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) : JsonResource
    {
        $request->request->add(['user_id' => Auth::user()->id]);
        $request->request->add(['author' => 'delete']);

        $request->validate([
            'author' => 'required',
            'post_id' => 'required',
            'user_id' => 'required',
        ]);

        return new JsonResource(
            CommentsData::createFromModel(Comment::create($request->only(['author', 'content', 'post_id', 'user_id'])))
        );
    }
}
