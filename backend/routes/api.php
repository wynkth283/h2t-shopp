<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return response()->json([
        'message' => 'Hello World'
    ]);
});

use App\Http\Controllers\UsersController;
Route::get('/users', [UsersController::class, 'index']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
