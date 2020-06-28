<?php

namespace App\Data;

use Illuminate\Database\Eloquent\Model;

interface Data
{
    public static function fromModel(Model $model);
}
