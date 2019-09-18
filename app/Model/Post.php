<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['name', 'content', 'catalog_id', 'file_id'];

    public function getTable()
    {
        return 'post';
    }

    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany('App\Model\Comment', 'post_id');
    }

    /**
     * Get the comments for the blog post.
     */
    public function file()
    {
        return $this->belongsTo('App\Model\File');
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function (Post $post) {
            $post->comments()->delete();
            $post->file()->delete();
        });
    }
}