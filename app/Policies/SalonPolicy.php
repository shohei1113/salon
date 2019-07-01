<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Salon;
use Illuminate\Auth\Access\HandlesAuthorization;

class SalonPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can view any salons.
     *
     * @param  \App\Entities\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function view(User $user, Salon $salon)
    {
        //
    }

    /**
     * Determine whether the user can create salons.
     *
     * @param  \App\Entities\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function update(User $user, Salon $salon)
    {
        //
    }

    /**
     * Determine whether the user can delete the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function delete(User $user, Salon $salon)
    {
        //
    }

    /**
     * Determine whether the user can restore the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function restore(User $user, Salon $salon)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function forceDelete(User $user, Salon $salon)
    {
        //
    }
}
