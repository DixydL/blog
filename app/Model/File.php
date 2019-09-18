<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class File extends Model{
    protected $fillable = ['path'];

    public function getTable()
    {
        return 'files';
    }
}