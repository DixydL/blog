<?php

namespace App\Data\User;

use App\Data\Data;
use App\Data\FileData;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Spatie\DataTransferObject\DataTransferObject;

class UserData extends DataTransferObject implements Data
{
    public int $id;

    public string $name;

    public ?FileData $avatar;

    public ?string $description;

    /**
     * Undocumented function
     *
     * @param User $model
     * @return void
     */
    public static function fromModel(Model $model)
    {
        $avatarData = null;

        if ($model->avatar()->exists()) {
            //dd($model->avatar);
            $avatarData = new FileData([
                'id' => $model->avatar->id,
                'url' => $model->avatar->url_resize
            ]);
        }
        return new  self([
            'id' => $model->id,
            'name' => $model->name,
            'avatar' => $avatarData,
            'description' => $model->description,
        ]);
    }
}
