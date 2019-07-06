<?php

namespace App\Policies;

use App\Entities\User;
use App\Entities\Salon;
use Illuminate\Auth\Access\HandlesAuthorization;

/**
 * Class SalonPolicy
 * @package App\Policies
 */
class SalonPolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can update the salon.
     *
     * @param  \App\Entities\User  $user
     * @param  \App\Entities\Salon  $salon
     * @return mixed
     */
    public function update(User $user, Salon $salon)
    {
        return $user->id === $salon->owner_id;
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
        return $user->id === $salon->owner_id;
    }
}
