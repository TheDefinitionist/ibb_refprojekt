<?php

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Controllers\AccountController;

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



/* ----- ROUTES WITH AUTHCONTROLLER ----- */

// Routes for authenticated user activities
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::put('update/{id}', 'update');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});

// Routes for the customer account panel
Route::controller(AccountController::class)->group(function () {
    Route::put('updateusername/{id}', 'updateUsername');
    Route::put('updateemail/{id}', 'updateEmail');
});


/* ----- RESET PASSWORD ROUTES ----- */

// Get the email form to reset the password
Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
})->middleware('guest')->name('password.request');

// Posts request to reset the password and sends the link per email 
Route::post('/forgot-password', function (Request $request) {

    $request->validate(['email' => 'required|email']);
 
    $status = Password::sendResetLink(
        $request->only('email')
    );
 
    return $status === Password::RESET_LINK_SENT
        // ? back()->with(['status' => __($status)])
        // : back()->withErrors(['email' => __($status)]);
        ? response()->json(['status' => 'success', 'sendResetLinkStatus' => $status, 'message' => 'Mail was sent.'])
        : response()->json(['status' => 'error', 'sendResetLinkStatus' => $status, 'message' => 'Cannot send mail.']);
})->middleware('guest')->name('password.email');

// Route to the password reset form after clicking on the link in the mail 
Route::get('/reset-password/{token}', function ($token) {
    return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

// Validates the entries sent on the reset password form and finish
Route::post('/reset-password', function (Request $request) {

    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:6|confirmed',
        'password_confirmation' => 'required|min:6',
    ]);
 
    $status = Password::reset(
       
        $request->only('token', 'email', 'password', 'password_confirmation'),

        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));
 
            $user->save();
 
            event(new PasswordReset($user));
        }
    );
 
    return $status === Password::PASSWORD_RESET
        // ? redirect()->route('login')->with('status', __($status))
        // : back()->withErrors(['email' => [__($status)]]);
        ? response()->json(['status' => 'success', 'message' => 'Your password was reset.'])
        : response()->json(['status' => 'error', 'message' => 'Could not send password.']);
})->middleware('guest')->name('password.update');


/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/
