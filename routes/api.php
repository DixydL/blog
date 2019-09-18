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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Post
Route::resource('v1/post', 'API\V1\PostController', [
    'except' => ['show', 'store']
]);

//comment
Route::resource('v1/comment', 'API\V1\CommentController');
//Route::model('v1/catalog-post', 'Model\Catalog');
Route::resource('v1/catalog.post', 'API\V1\CatalogPostController');
Route::resource('v1/file', 'API\V1\FileController');


Route::post('v1/post/create', 'API\V1\PostController@store');
//Route::post('v1/post', 'API\V1\PostController@index');
Route::get('v1/comment/{post_id}', 'API\V1\CommentController@index');
Route::apiResource('v1/post', 'API\V1\PostController')->only(['show', 'store', 'update']);
Route::apiResource('v1/catalog', 'API\V1\CatalogController')->only(['index', 'show', 'store', 'update', 'destroy']);
Route::apiResource('v1/comment', 'API\V1\CommentController')->only(['show', 'store']);
Route::apiResource('v1/catalog.post', 'API\V1\CatalogPostController')->only('index');
Route::apiResource('v1/file', 'API\V1\FileController')->only('show', 'store');


