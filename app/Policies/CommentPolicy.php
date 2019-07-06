<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Comment;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Http\Request;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create comments.
     *
     * @param  \App\Entities\User  $user
     * @return mixed
     */
    public function create(User $user, Request $request)
    {

    }

    /**
     * Determine whether the user can update the comment.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Comment  $comment
     * @return mixed
     */
    public function update(User $user, Comment $comment)
    {
        return $user->id === $comment->user_id;
    }

    /**
     * Determine whether the user can delete the comment.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Comment  $comment
     * @return mixed
     */
    public function delete(User $user, Comment $comment)
    {
        return $user->id === $comment->user_id;
    }
}
