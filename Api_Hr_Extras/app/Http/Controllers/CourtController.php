<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\court;
use Exception;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\TryCatch;

class CourtController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return ApiResponse::success("datos", 200, court::all());
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 420);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                "name" => "required",
                "date_i" => "required",
                "date_f" => "required"
            ]);

            $data = court::create($request->all());

            return ApiResponse::success("Registro agregado", 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(court $court)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, court $court, $id)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'status' => 'required',
                // Agrega otras reglas de validación según sea necesario
            ]);

            $auten = Auth::user()->id;
            // Actualizar el registro con los datos validados
            $dat = $court->findOrFail($id);

            $dat->update([
                "status" => $request->status,
                "usuario_finalizador" => $auten
            ]);

            return ApiResponse::success("Realizado", 201, []);
        } catch (\Throwable $th) {
            return ApiResponse::error('Ocurrio un error', []);
        } //
    }

    public function UpdateCorte(Request $request, court $court, $id)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'name' => 'required',
                'date_i' => 'required',
                'date_f' => 'required',
                // Agrega otras reglas de validación según sea necesario
            ]);

            $dat = $court->findOrFail($id);

            $dat->update([
                'name' => $request->name,
                'date_i' => $request->date_i,
                'date_f' => $request->date_f,
            ]);

            return ApiResponse::success("Corte actualizado", 201, [$dat]);
        } catch (\Throwable $th) {
            return ApiResponse::error('Ocurrio un error', []);
        } //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(court $court)
    {
        //
    }
}
