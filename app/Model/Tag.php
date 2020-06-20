<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Tag
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Tag whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Post[] $posts
 * @property-read int|null $posts_count
 */
class Tag extends Model
{

    public function getTable()
    {
        return 'tags';
    }

    protected $fillable = ['name', 'description'];
    //protected $hidden = [''];

    public function posts()
    {
        return $this->morphedByMany('App\Model\Post', 'tagable');
    }
}
