<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Resources\CommentCollection;
use App\Http\Resources\CommentResource;
use App\Model\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($post_id) : CommentCollection
    {
        return new CommentCollection(Comment::where('post_id', $post_id)->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) : CommentResource
    {
        $request->validate([
            'author' => 'required|max:255|regex:/([A-ZА-Я])[\wА-я]+\s([A-ZА-Я])[\wА-я]+$/i',
            'post_id' => 'required'
        ]);

        return new CommentResource(
            Comment::create($request->only(['author', 'content', 'post_id']))
        );
    }
}
