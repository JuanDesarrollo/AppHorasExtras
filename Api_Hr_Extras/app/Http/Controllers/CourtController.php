<?php

namespace App\Http\Controllers;

use App\Http\Requests\Court\CourtCreateRequest;
use App\Http\Requests\Court\CourtEstadoUpdateRequest;
use App\Http\Requests\Court\CourtUpdateRequest;
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
    public function store(CourtCreateRequest $request)
    {
        $data = court::create($request->all());

        return ApiResponse::success("Registro agregado", 200, $data);
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
    public function update(CourtEstadoUpdateRequest $request, court $court, $id)
    {
        try {

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

    public function UpdateCorte(CourtCreateRequest $request, court $court, $id)
    {
        $dat = $court->findOrFail($id);

        $dat->update([
            'name' => $request->name,
            'date_i' => $request->date_i,
            'date_f' => $request->date_f,
        ]);

        return ApiResponse::success("Corte actualizado", 201, [$dat]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(court $court)
    {
        //
    }
}
