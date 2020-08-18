<?php

namespace App\Http\Controllers\API\V1\Tool;

use ChaosTangent\ASS\Script;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubConverterController
{
    public function index(Request $request)
    {
        $plainTextData = "";
        $subs = explode("\n", $request->text);
        foreach ($subs as $sub) {
            $value = explode(",,", $sub);
            $plainTextData.="$value[1]\n\n";
        }

        return response($plainTextData);
    }
}
