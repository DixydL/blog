<?php

namespace App\Helper;

class Symbol
{
    public static function chapterSymbolCount(int $symbol) : string
    {
        if ($symbol >= 1000) {
            $symbol = number_format(($symbol/1000), 1);
            $symbol = $symbol . "К";
        }
        return (string)$symbol;
    }
}
