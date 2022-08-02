<?php

use App\Http\Controllers\AccountController;

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

Route::resource('accounts', AccountController::class);
Route::get('/accounts/username/{username}', [AccountController::class, 'search']);

// Route::get('/accounts', [AccountController::class, 'index']);
// Route::post('/accounts', [AccountController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
