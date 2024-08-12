<?php

namespace App\Http\Controllers;

use App\Http\Requests\DisapprovedHour\DisapprovedHourCreate;
use App\Http\Responses\ApiResponse;
use App\Models\disapproved_hour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class DisapprovedHourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DisapprovedHourCreate $request)
    {
        try {
            $user = Auth::user()->id;
            disapproved_hour::create([
                "detail_hour_id" => $request->id,
                "reason" => $request->reason,
                "user_id" => $user
            ]);
            return ApiResponse::success("Realizado", 200, []);
        } catch (\Error $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(disapproved_hour $disapproved_hour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, disapproved_hour $disapproved_hour)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(disapproved_hour $disapproved_hour)
    {
        //
    }
}
