<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateUsername(Request $request, $id)
    {
        

        $user = User::find(Auth::user()->id);

        // if ($auth->id == $user->id) {
            

            try {

                //DB::update("UPDATE users SET name = 'Josef' WHERE id = 22"); 
                if ($user) {

                    $validate = $request->validate([
                        'name' => 'required|string|max:255|min:3'
                    ]);

                    $user->name = $request['name'];
                    
                    if ($user->save()) {
                        return response()->json([
                            'status' => 'success',
                            'message' => 'Successfully updated the username',
                            'user' => $user
                        ]);
                    }
                }
            } catch (Exception $e) {
                dd($e->getMessage());
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage()
                ]);
            }

        // } else {
        //     return response()->json([
        //         'status' => 'error',
        //         'message' => "A user is not eligible to update other user's data"
        //     ]);
        // }
    }
}
