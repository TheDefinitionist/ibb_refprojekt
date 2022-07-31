<?php
use App\Models\Account;
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

Route::get('/account', function() {
    return Account::all();
});

Route::post('/account', function() {
    return Account::create([
        'username' => 'John Doe',
        'password' => 'john123',
        'email' => 'j.doe@email.com',
        'token' => 'l89h84ht872g26frgt9ehbt03nwosw8ht09th30duh'
    ]);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
