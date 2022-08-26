<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /** 
     * Excludes the middleware when login or register is being executed
     * @param void
     * @return void
     * */ 
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    /**
     * Log into the account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Register a new account.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255|min:3',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
       
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    /**
     * Authenticate with password and email
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function authenticate(Request $request)
    {
        /*$request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);*/
        try {
            $user = User::where('email', $request->email)->first();
            $auth = Auth::user();

            if ($auth->email == $user->email) {
                
                // dd($auth->email == $user->email);

                $request->validate([
                    'email' => 'required|string|email',
                    'password' => 'required|string',
                ]);

                $pass = DB::select(
                    "SELECT `password` FROM `users` where `email` = :email", 
                    ["email" => $request->email]);

                // dd(Hash::check($request->password, $pass[0]->password));

                if (Hash::check($request->password, $pass[0]->password)) {
                    return response()->json([
                        'message' => 'Authentication was succesful.',
                        'status' => 'success',
                        'user' => $user
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Wrong password.',
                        'user' => $user
                    ]);
                }
            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => "A user is not eligible to update other user's data"
                ]);
            }
        } catch (Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, $id) 
    {
        $request->validate([
            'name' => 'required|string|max:255|min:3'
        ]);

        $auth = Auth::user();
        $user = User::find($id);

        if ($auth->id == $user->id) {
            $user->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully updated the user',
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => "A user is not eligible to update other user's data"
            ]);
        }
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function me()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}