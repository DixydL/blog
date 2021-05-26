<?php

namespace App\Model;

use App\Data\Likes\LikeData;
use Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; //add this line

/**
 * App\Model\Art
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $signature
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Comment[] $comments
 * @property-read int|null $comments_count
 * @property-read \App\Model\File $file
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Tag[] $tags
 * @property-read int|null $tags_count
 * @property-read \App\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $usersLikes
 * @property-read int|null $users_likes_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Model\Art onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereSignature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Art whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Model\Art withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Model\Art withoutTrashed()
 * @mixin \Eloquent
 */
class Art extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'signature', 'user_id'];

    public function getTable()
    {
        return 'arts';
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

    public function tags()
    {
        return $this->morphToMany('App\Model\Tag', 'tagable');
    }

    public function images()
    {
        return $this->morphToMany('App\Model\File', 'imagesables');
    }

    public function coverImage()
    {
        return $this->belongsTo('App\Model\File', 'cover_image_id', 'id');
    }

    public function usersLikes()
    {
        return $this->morphToMany('App\User', 'likesable');
    }

    public function isLike() : LikeData
    {
        $like = LikeData::createData(false);
        $user = Auth::guard('api')->user();

        if ($user && $this->usersLikes()->where('id', $user->id)->exists()) {
            $like->isLike = true;
        }

        return $like;
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
