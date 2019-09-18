<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = ['name', 'description'];

    public function getTable()
    {
        return 'catalogs';
    }

    /**
     * Get the post for the blog catalog.
     */
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