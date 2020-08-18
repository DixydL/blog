<?php

namespace App\Http\Controllers\API\V1\Tool;

use ChaosTangent\ASS\Script;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use phpDocumentor\Reflection\DocBlock\Tags\Throws;
use Throwable;

class SubConverterController
{
    public function index(Request $request)
    {
        if (empty($request->text)) {
            return response("please fill sub ass");
        }
        try {
            $plainTextData = "";
            $subs = explode("\n", $request->text);
            foreach ($subs as $sub) {
                $value = explode(",,", $sub);
                $plainText = str_replace("\N", "\n", $value[1]);
                $plainText = preg_replace("/\{.*?\}|/", "", $plainText);
                $plainTextData.="$plainText\n\n";
            }
        } catch (Throwable $error) {
            return response("Перевірте субтитри");
        }

        return response($plainTextData);
    }
}
