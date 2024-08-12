<?php

namespace App\Http\Controllers;

use App\Http\Requests\HorasPorcentajes\HorasPorcentajesUpdateRequest;
use App\Http\Responses\ApiResponse;
use App\Models\HorasPorcentajes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HorasPorcentajesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = HorasPorcentajes::all();
        return ApiResponse::success('Realizado', 201, $data);
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
    public function show(HorasPorcentajes $horasPorcentajes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(HorasPorcentajesUpdateRequest $request, HorasPorcentajes $horasPorcentajes,  $id)
    {


            // $data = $request->all();
            $userid = Auth::user()->id;
            $dataN1 = HorasPorcentajes::findOrFail($id);
            $dataN1->update([
                "conceptos" => $request->conceptos,
                "porcentaje"  => $request->porcentaje,
                "company_code" => $request->company_code,
                "company_code_seguridad" => $request->company_code_seguridad,
                "user" =>  $userid
            ]);
            return ApiResponse::success('Registro actualizado', 201, HorasPorcentajes::all());

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HorasPorcentajes $horasPorcentajes)
    {
        //
    }
}
