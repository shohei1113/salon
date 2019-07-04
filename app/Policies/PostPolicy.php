<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Post;
use Illuminate\Auth\Access\HandlesAuthorization;

class PostPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can update the post.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Post  $post
     * @return mixed
     */
    public function update(User $user, Post $post)
    {
        return $user->id === $post->salon->owner_id;
    }

    /**
     * Determine whether the user can delete the post.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Post  $post
     * @return mixed
     */
    public function delete(User $user, Post $post)
    {
        return $user->id === $post->salon->owner_id;
    }
}
