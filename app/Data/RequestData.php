<?php

namespace App\Data;

use Illuminate\Foundation\Http\FormRequest;

interface RequestData
{
    public static function fromRequest(FormRequest $request);
}
