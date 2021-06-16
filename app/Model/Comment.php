<?php

namespace App\Model;

use Carbon\Carbon;
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
 * @property int $user_id
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Comment whereUserId($value)
 */
class Comment extends Model
{
    protected $fillable = ['author', 'content', 'post_id', 'user_id', 'parent_id'];

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

    public function timePost()
    {
        $currentTime = Carbon::now();

        if ($currentTime->diffInMinutes($this->created_at) === 0) {
            return $this->getAgo($currentTime->diffInSeconds($this->created_at), ['секунду', 'секунди', 'секунд']);
        }

        if ($currentTime->diffInMinutes($this->created_at) <= 60) {
            return $this->getAgo($currentTime->diffInMinutes($this->created_at), ['хвилину', 'хвилини', 'хвилин']);
        }

        if ($currentTime->diffInHours($this->created_at) <= 24) {
            return $this->getAgo($currentTime->diffInHours($this->created_at), ['годину', 'години', 'годин']);
        }

        if ($currentTime->diffInDays($this->created_at) <= 30) {
            return $this->getAgo($currentTime->diffInDays($this->created_at), ['день', 'дні', 'днів']);
        }

        return $this->created_at->format("d/m/y");
    }


    public function getAgo(int $diff, array $agoParams): string
    {
        if ($diff >= 11 && $diff <= 14) {
            return $diff . " $agoParams[2] тому";
        }

        if ($diff%10 == 1) {
            return $diff . " $agoParams[0] тому";
        }

        if ($diff%10 >= 2 && $diff%10 <= 4) {
            return $diff . " $agoParams[1] тому";
        }

        return $diff . " $agoParams[2] тому";
    }
}
