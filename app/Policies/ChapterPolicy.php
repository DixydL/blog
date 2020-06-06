<?php

namespace App\Policies;

use App\Model\Chapter;
use App\Model\Post;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ChapterPolicy
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

    public function update(User $user, Chapter $chapter, Post $post)
    {
        return $user->id === $post->user_id;
    }
}
