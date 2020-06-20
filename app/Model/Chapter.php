<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Chapter
 *
 * @property int $id
 * @property string $name
 * @property string $text
 * @property int $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Model\Post|null $post
 * @property int|null $indeficator
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Chapter whereIndeficator($value)
 */
class Chapter extends Model
{
    protected $fillable = ['name', 'text'];
    protected $hidden = ['post_id'];
    protected $casts = ['created_at' => 'datetime:Y-m-d'];
    protected $dates = ['created_at'];


/**
 * Undocumented function
 *
 * @return void
 */
    public function post()
    {
        return $this->hasOne('App\Model\Post');
    }
}
