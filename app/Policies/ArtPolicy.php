<?php

namespace App\Policies;

use App\Model\Art;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArtPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }


    public function update(User $user, Art $art)
    {
        return $user->id === $art->user_id;
    }

    public function delete(User $user, art $art)
    {
        return $user->id === $art->user_id;
    }
}
