<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\area;
use FFI\Exception;
use Illuminate\Http\Request;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
          
       try {
            return ApiResponse::success("datos", 200, area::all());
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 420);
        } 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(area $area)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, area $area)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(area $area)
    {
        //
    }
}
