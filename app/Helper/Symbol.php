<?php

namespace App\Helper;

class Symbol
{
    public static function chapterSymbolCount(int $symbol) : string
    {
        if ($symbol >= 1000) {
            $symbol = (int)($symbol/1000);
            $symbol = $symbol . "К";
        }
        return (string)$symbol;
    }
}
