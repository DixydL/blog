<?php

namespace App\Http\Controllers\API\V1;

use App\Data\CommentsData;
use App\Http\Resources\CommentCollection;
use App\Http\Resources\CommentResource;
use App\Model\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\CommentService;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentController extends Controller
{
    public CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $post_id)
    {
        $chunk = $request->chunk ?? 1;
        $comments = Comment::where('post_id', $post_id)
            ->where('parent_id', null)
            ->orderBy('created_at', 'desc')
            ->offset(($chunk-1) * 7)
            ->limit(7)
            ->get();

        $commentsData = [];

        foreach ($comments as $comment) {
            $commentsData[] = CommentsData::createFromModel($comment);
        }

        return new JsonResource(
            [
                'comments' => $commentsData,
                'count' => Comment::where('post_id', $post_id)->where('parent_id', null)->count()
            ]
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
            'content' => 'required',
            'user_id' => 'required',
        ]);

        return new JsonResource(
            $this->commentService->create($request)
        );
    }
}
