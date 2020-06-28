<?php

namespace App\Model;

use App\User;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\File
 *
 * @property int $id
 * @property string $path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\File whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class File extends Model
{
    protected $fillable = ['path', 'url', 'name', 'url_resize'];

    public function getTable()
    {
        return 'files';
    }
}
