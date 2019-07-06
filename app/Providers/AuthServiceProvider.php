<?php

namespace App\Providers;

use App\Entities\Comment;
use App\Entities\Post;
use App\Entities\Salon;
use App\Policies\CommentPolicy;
use App\Policies\PostPolicy;
use App\Policies\SalonPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Comment::class => CommentPolicy::class,
        Post::class => PostPolicy::class,
        Salon::class => SalonPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
