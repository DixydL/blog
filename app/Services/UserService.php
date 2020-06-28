<?php

namespace App\Services;

use App\Data\User\UserData;
use App\Data\User\UserSettingRequestData;
use App\User;

class UserService
{
    public function editProfileUser(User $user, UserSettingRequestData $userRequestData)
    {
        $user->description = $userRequestData->description;
        $user->save();
        return UserData::fromModel($user);
    }

    public function view(User $user)
    {
        return UserData::fromModel($user);
    }
}
