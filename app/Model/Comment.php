<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model{
    protected $fillable = ['author', 'content', 'post_id'];

    public function getTable()
    {
        return 'comments';
    }
}