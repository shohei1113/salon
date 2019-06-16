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

    Route::apiResource('user', 'UserController');
    Route::post('payment/card', 'PaymentController@paymentByCard')->name('api.payment.card');
    Route::post('payment/card/cancel', 'PaymentController@cancelPaymentByCard')->name('api.payment.card.cancel');

    /*
    |--------------------------------------------------------------------------
    | Auth Routes
    |--------------------------------------------------------------------------
    */
    Route::post('signup', 'AuthController@signup')->name('api.signup');
    Route::post('register', 'AuthController@register')->name('api.register');
    Route::post('me', 'AuthController@login')->name('auth.login');
    Route::delete('me', 'AuthController@logout')->middleware('jwt.refresh');

    Route::get('auth/login/{socialite}', 'AuthController@redirectToSocialiteProvider');
    Route::get('auth/{socialite}/callback', 'AuthController@socialiteCallback');

    /*
    |--------------------------------------------------------------------------
    | jwt auth Routes
    |--------------------------------------------------------------------------
    */
    Route::group(['middleware' => ['jwt.auth']], function () {
        /*
        |--------------------------------------------------------------------------
        | User Routes
        |--------------------------------------------------------------------------
        */
        Route::get('me', 'UserController@loginUserInfo');
        Route::apiResource('category', 'CategoryController');

        /*
        |--------------------------------------------------------------------------
        | Category Routes
        |--------------------------------------------------------------------------
        */
        Route::get('category/{category}/salon', 'SalonController@index');
        Route::apiResource('salon', 'SalonController');
    });
});