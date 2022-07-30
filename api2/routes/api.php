<?php
use App\Models\User;
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

Route::get('/user', function() {
    return User::all();
});

Route::post('/user', function() {
    return User::create([
        'username' => 'John Doe',
        'password' => 'john123',
        'email' => 'j.doe@email.com',
        'token' => 'l89h84ht872g26frgt9ehbt03nwosw8ht09th30duh',
        'premium_id' => 2
    ]);
});

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
