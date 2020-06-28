<?php

namespace App\Http\Controllers\API\V1;

use App\Data\User\UserSettingRequestData;
use App\Http\Requests\User\UserSetingRequest;
use App\Services\UserService;
use App\User;
use Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class UserController
{
    public UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function profileUpdate(UserSetingRequest $request)
    {
        return new JsonResource(
            $this->userService->editProfileUser(
                Auth::user(),
                UserSettingRequestData::fromRequest($request)
            )
        );
    }

    public function profile(User $user)
    {
        return new JsonResource(
            $this->userService->view(
                $user
            )
        );
    }
}
