<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the username.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateUsername(Request $request, $id)
    {
        try {
            $user = User::find(Auth::user()->id);

            if ($user) {

                $request->validate([
                    'name' => 'required|string|max:255|min:3'
                ]);

                DB::update(
                    "UPDATE `users` SET `name` = :name WHERE `id` = :id", 
                    ["name" => $request->name, "id" => $request->id]
                ); 
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully updated the username',
                    'user' => $user
                ]);
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
    
    /**
     * Update the email.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateEmail(Request $request, $id)
    {
        try {
            $user = User::find(Auth::user()->id);

            if ($user) {

                $request->validate([
                    'email' => 'required|email|string|max:255|unique:users'
                ]);       

                DB::update(
                    "UPDATE `users` SET `email` = :email WHERE `id` = :id", 
                    ["email" => $request->email, "id" => $request->id]
                ); 
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully updated the email address',
                    'user' => $user
                ]);
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

    /**
     * Update the pasword.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request, $id)
    {
        try {
            $auth = Auth::user();
            $user = User::find($id);
            // dd($auth->id, $user->id);

            if ($auth->id == $user->id) {

                $request->validate([
                    'password' => 'required|string|min:6'
                ]);  

                DB::update(
                    "UPDATE `users` SET `password` = :pass WHERE `id` = :id", 
                    ["pass" => Hash::make($request->password), "id" => $request->id]
                ); 
                
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully updated the password.',
                    'user' => $user
                ]);
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
}
