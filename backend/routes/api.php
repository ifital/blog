<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;

Route::apiResource('posts', PostController::class);
Route::post('comments', [CommentController::class, 'store']);
Route::delete('comments/{id}', [CommentController::class, 'destroy']);
