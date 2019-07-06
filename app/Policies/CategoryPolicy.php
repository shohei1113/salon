<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;
    
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
}
