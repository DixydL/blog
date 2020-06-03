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
    return view('welcome');
});
Route::get('{any}', function () {
    return view('welcome');
});

Route::get('{any}/{id}', function () {
    return view('welcome');
});

Route::get('{any}/{id}/{any2}/{id2}', function () {
    return view('welcome');
});

Route::get('{any}/{id}/{any2}', function () {
    return view('welcome');
});

Auth::routes();


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
