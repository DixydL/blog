<?php

namespace App\Data;

use Spatie\DataTransferObject\DataTransferObject;

class FileData extends DataTransferObject
{
    public int $id;

    public string $url;
}
