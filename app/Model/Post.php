<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Post
 *
 * @property int $id
 * @property string $name
 * @property string|null $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $catalog_id
 * @property int|null $file_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Catalog[] $catalog
 * @property-read int|null $catalog_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \App\Model\File|null $file
 * @property-read \App\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereCatalogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereFileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $user_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Tag[] $tags
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereUserId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Chapter[] $chapters
 * @property-read int|null $chapters_count
 * @property string|null $description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Post whereDescription($value)
 */
class Post extends Model
{
    protected $fillable = ['name', 'description', 'catalog_id', 'user_id'];

    public function getTable()
    {
        return 'post';
    }

        /**
     * Get the comments for the blog post.
     */
    public function chapters()
    {
        return $this->hasMany('App\Model\Chapter', 'post_id');
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

        /**
     * Get the comments for the blog post.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the comments for the blog post.
     */
    public function catalog()
    {
        return $this->hasManyThrough(
            'App\Model\Catalog',
            'App\Model\PostCatalog',
            'post_id',
            'id',
            'id',
            'catalog_id'
        );
    }

    public function tags()
    {
        return $this->morphToMany('App\Model\Tag', 'tagable');
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
