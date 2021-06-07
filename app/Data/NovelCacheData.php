<?php

namespace App\Data;

use Spatie\DataTransferObject\DataTransferObject;

class NovelCacheData extends DataTransferObject
{
    public int $chaptersSymbolCounter = 0;

    public int $chaptersCount = 0;

    public int $sdf = 2;
}
