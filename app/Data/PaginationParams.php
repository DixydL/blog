<?php

namespace App\Data;

use Illuminate\Http\Request;
use Spatie\DataTransferObject\DataTransferObject;

class PaginationParams extends DataTransferObject
{
    public int $perPage = 10;

    public int $currentPage;

    public static function fromRequest(Request $request)
    {
        return new self([
            'currentPage' => (int)$request->page ?: 1
        ]);
    }
}
