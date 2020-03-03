<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Model\PostCatalog
 *
 * @property int $post_id
 * @property int $catalog_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereCatalogId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Model\PostCatalog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PostCatalog extends Model
{
    protected $fillable = ['name', 'content', 'catalog_id', 'file_id'];
}