<?php

namespace App\Data;

use Spatie\DataTransferObject\DataTransferObject;

class NovelCacheData extends DataTransferObject
{
    public int $chaptersSymbolCounter;

    public int $chaptersCount;

    public int $sdf = 2;
}
