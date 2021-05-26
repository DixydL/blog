<?php


namespace App\Providers;

use App\Model\Art;
use App\Model\Chapter;
use App\Model\Post;
use App\Policies\ArtPolicy;
use App\Policies\ChapterPolicy;
use App\Policies\PostPolicy;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        Chapter::class => ChapterPolicy::class,
        Post::class => PostPolicy::class,
        Art::class => ArtPolicy::class,
    ];


    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::routes();
    }
}
