<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/signup', function () {
    return view('index');
});
Route::get('/signup/complete', function () {
    return view('index');
});
Route::get('/register', function () {
    return view('index');
});
Route::get('/login', function () {
    return view('index');
});

Route::get('/password/send', function () {
    return view('index');
});
Route::get('/password/reset', function () {
    return view('index');
});

Route::get('/salons', function () {
    return view('index');
});
Route::get('/salon', function () {
    return view('index');
});
Route::get('/salon/register', function () {
    return view('index');
});
Route::get('/salon/member', function () {
    return view('index');
});

// マイページ
Route::get('/user/info', function () {
    return view('index');
});
Route::get('/user/email', function () {
    return view('index');
});
Route::get('/user/email/complete', function () {
    return view('index');
});
Route::get('/user/password', function () {
    return view('index');
});
Route::get('/user/salon', function () {
    return view('index');
});
