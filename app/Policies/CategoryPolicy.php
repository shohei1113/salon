<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view any categories.
     *
     * @param  \App\Entities\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the category.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Category  $category
     * @return mixed
     */
    public function view(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can create categories.
     *
     * @param  \App\Entities\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the category.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Category  $category
     * @return mixed
     */
    public function update(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can delete the category.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Category  $category
     * @return mixed
     */
    public function delete(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can restore the category.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Category  $category
     * @return mixed
     */
    public function restore(User $user, Category $category)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the category.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Category  $category
     * @return mixed
     */
    public function forceDelete(User $user, Category $category)
    {
        //
    }
}
