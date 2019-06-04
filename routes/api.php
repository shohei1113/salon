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

    Route::post('register', 'AuthController@register')->name('api.register');
    Route::post('me', 'AuthController@login')->name('auth.login');
    Route::delete('me', 'AuthController@logout');
    Route::post('/logout', 'AuthController@logout');

    Route::get('auth/login/{socialite}', 'AuthController@redirectToSocialiteProvider');
    Route::get('auth/{socialite}/callback', 'AuthController@socialiteCallback');

    Route::group(['middleware' => ['jwt.auth']], function () {
        Route::get('me', 'UserController@loginUserInfo');
        Route::get('test', 'TestController@index');
    });
});