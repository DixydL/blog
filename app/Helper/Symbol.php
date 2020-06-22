<?php

namespace App\Helper;

class Symbol
{
    public static function chapterSymbolCount(int $symbol) : string
    {
        if ($symbol >= 1000) {
            $symbol = $symbol/1000 . "К";
        }
        return (string)$symbol;
    }
}
