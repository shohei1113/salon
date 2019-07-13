<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['namespace' => 'API', 'as' => 'api.'], function() {

    /*
    |--------------------------------------------------------------------------
    | Auth Routes
    |--------------------------------------------------------------------------
    */
    Route::post('signup', 'AuthController@preRegister')->name('preRegister');
    Route::post('register', 'AuthController@register')->name('register');
    Route::post('me', 'AuthController@login')->name('auth.login');
    Route::delete('me', 'AuthController@logout')->middleware('jwt.refresh')->name('auth.logout');

//    Route::get('auth/login/{socialite}', 'AuthController@redirectToSocialiteProvider');
//    Route::get('auth/{socialite}/callback', 'AuthController@socialiteCallback');

    Route::get('category/{category}/salon', 'CategoryController@categoryListWithSalons')->name('category.salon.categoryListWithSalons');
    Route::get('salon', 'SalonController@index')->name('salon.index');
    Route::get('salon/preview/{salon}', 'SalonController@preview')->name('salon.preview');

    Route::get('category', 'CategoryController@index')->name('category.index');

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
        Route::get('me', 'UserController@info')->name('user');
        Route::get('user', 'UserController@index')->name('user.index');
        Route::post('user', 'UserController@store')->name('user.store');
        Route::put('user/auth', 'UserController@updateAuthInfo')->name('user.updateAuthInfo');
        Route::put('user/basic', 'UserController@updateBasicInfo')->name('user.updateBasicInfo');
//        Route::delete('user/{user}', 'UserController@destroy')->name('user.delete');
        Route::get('user/mypage', 'UserController@mypage')->name('user.mypage');
        Route::post('user/reset/email', 'UserController@sendMailToChangeEmail')->name('user.change.email');
        Route::post('user/update/email', 'UserController@resetEmail')->name('user.update.email');

        /*
        |--------------------------------------------------------------------------
        | Salon Routes
        |--------------------------------------------------------------------------
        */
        Route::post('salon', 'SalonController@store')->name('salon.store');
        Route::put('salon/{salon}', 'SalonController@update')->name('salon.update');
        Route::delete('salon/{salon}', 'SalonController@destroy')->name('salon.delete');
        Route::get('salon/{post}', 'SalonController@show')->name('salon.show');

        /*
        |--------------------------------------------------------------------------
        | Payment Routes
        |--------------------------------------------------------------------------
        */
        Route::post('salon/{salon}/payment/card', 'PaymentController@paymentByCard')->name('payment.card');
        Route::post('salon/{salon}/payment/card/cancel', 'PaymentController@cancelPaymentByCard')->name('payment.card.cancel');

        /*
        |--------------------------------------------------------------------------
        | Category Routes
        |--------------------------------------------------------------------------
        */
        Route::post('category', 'CategoryController@store')->name('category.st　ore');
        Route::put('category/{category}', 'CategoryController@update')->name('category.update');
//        Route::delete('category/{category}', 'CategoryController@destroy')->name('category.delete');


        /*
        |--------------------------------------------------------------------------
        | Post Routes
        |--------------------------------------------------------------------------
        */
        Route::get('salon/{salon}/post', 'PostController@index')->name('salon.post.index');
        Route::get('post', 'PostController@index')->name('post.index');
        Route::post('post', 'PostController@store')->name('post.store');
        Route::get('post/{post}', 'PostController@show')->name('post.show');
        Route::put('post/{post}', 'PostController@update')->name('post.update');
        Route::delete('post/{post}', 'PostController@destroy')->name('post.delete');

        /*
        |--------------------------------------------------------------------------
        | Comment Routes
        |--------------------------------------------------------------------------
        */
        Route::post('comment', 'CommentController@store')->name('comment.store');
        Route::get('comment/{comment}', 'CommentController@show')->name('comment.show');
        Route::put('comment/{comment}', 'CommentController@update')->name('comment.update');
        Route::delete('comment/{comment}', 'CommentController@destroy')->name('comment.delete');

    });
});
