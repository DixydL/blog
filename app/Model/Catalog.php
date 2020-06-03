<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\Catalog
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Model\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\Catalog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Catalog extends Model
{
    protected $fillable = ['name', 'description'];

    public function getTable()
    {
        return 'catalogs';
    }


    public function posts()
    {
        return $this->hasMany('App\Model\Post', 'catalog_id', 'id');
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function (Catalog $catalog) {
            $catalog->posts()->delete();
        });
    }
}
