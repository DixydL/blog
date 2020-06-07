<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Comment
 *
 * @property int $id
 * @property string $author
 * @property string|null $content
 * @property int $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Comment extends Model
{
    protected $fillable = ['author', 'content', 'post_id', 'user_id'];

    public function getTable()
    {
        return 'comments';
    }

     /**
     * Get the comments for the blog post.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
