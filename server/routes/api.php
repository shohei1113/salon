<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'API'], function() {

    Route::post('me', 'AuthController@login')->name('auth.login');
    Route::delete('me', 'AuthController@logout');

    Route::get('auth/login/{socialite}', 'SocialiteController@redirectToSocialiteProvider');
    Route::get('auth/facebook/callback', 'SocialiteController@socialiteCallback');

    Route::group(['middleware' => ['auth']], function () {
        Route::get('test', 'TestController@index');
    });
});