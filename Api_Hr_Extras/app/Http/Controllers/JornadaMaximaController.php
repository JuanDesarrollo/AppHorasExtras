<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\JornadaMaxima;
use Illuminate\Http\Request;
use Illuminate\Mail\SentMessage;

class JornadaMaximaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos = JornadaMaxima::all();
         return ApiResponse::success("datos", 200, $datos);

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
    public function show(JornadaMaxima $jornadaMaxima)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JornadaMaxima $jornadaMaxima)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JornadaMaxima $jornadaMaxima)
    {
        //
    }
}
