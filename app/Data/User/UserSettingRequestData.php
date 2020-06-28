<?php

namespace App\Data\User;

use App\Data\RequestData;
use Illuminate\Foundation\Http\FormRequest;
use Spatie\DataTransferObject\DataTransferObject;

class UserSettingRequestData extends DataTransferObject implements RequestData
{
    public ?string $name;

    public string $description;

    public static function fromRequest(FormRequest $request)
    {
        return new self([
            'name' => $request->name,
            'description' => $request->description
        ]);
    }
}
