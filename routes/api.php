<?php

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
//Avtorization
Route::post('v1/register', 'API\V1\RegisterController@register');
Route::post('v1/login', 'API\V1\RegisterController@login');
Route::post('v1/token', 'API\V1\RegisterController@token');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Post
Route::resource('v1/post', 'API\V1\PostController', [
    'except' => ['show', 'store', 'update']
]);
Route::apiResource('v1/post', 'API\V1\PostController')->only(['show', 'store']);
Route::resource('v1/catalog.post', 'API\V1\CatalogPostController');
Route::apiResource('v1/catalog.post', 'API\V1\CatalogPostController')->only('index');
Route::apiResource('v1/post.chapter', 'API\V1\PostChapterController')->only(['show','store']);
Route::apiResource('v1/post.catalog', 'API\V1\PostCatalogController')->only('index');
Route::get('v1/user/{user}/post', 'API\V1\UserPostController@index');
Route::get('v1/tag/{tag}/novel', 'API\V1\TagNovelController@index');

//comment
Route::resource('v1/comment', 'API\V1\CommentController');
Route::get('v1/comment/{post_id}', 'API\V1\CommentController@index');

//file
Route::resource('v1/file', 'API\V1\FileController');
Route::apiResource('v1/file', 'API\V1\FileController')->only('show', 'store');

//catalog
Route::apiResource('v1/catalog', 'API\V1\CatalogController')->only(['index', 'show', 'store', 'update', 'destroy']);


Route::middleware('auth:api')->group(function () {
    Route::post('v1/post/create', 'API\V1\PostController@store');
    Route::post('v1/catalog.post', 'API\V1\CatalogPostController@store');
    Route::post('v1/post/{post}/chapter/{chapter}', 'API\V1\PostChapterController@update');
    Route::delete('v1/post/{post}', 'API\V1\PostController@destroy');
    Route::post('v1/comment', 'API\V1\CommentController@store');
});

Route::middleware('auth:api')->put('v1/post/{post}', 'API\V1\PostController@update');
