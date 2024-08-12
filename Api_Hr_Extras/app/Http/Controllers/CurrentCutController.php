<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrentCut\CurrentCutCreateRequest;
use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\court;
use App\Models\current_cut;
use App\Models\employee;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\Print_;

class CurrentCutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user()->employee_id;
            $employe = employee::find($user)->area_id;
            $area = area::find($employe)->id;

            //$current_c = current_cut::select("court_id")->where("area_id",  $area)->get();
            $corteActual =  court::where('status', 'abierto')->first()->id;

            $corte = court::find($corteActual);
            /* $courts = current_cut::where('area_id', $area)
                ->with(['court' => function ($query) {
                    $query->select('id', 'name', 'date_i', 'date_f');
                }])
                ->get()
                ->pluck('court');
            // Mostrar los resultados
            $data = [];
            foreach ($courts as $court) {
                $data = [
                    'id' => $court->id,
                    'name' => $court->name,
                    'date_i' => $court->date_i,
                    'date_f' => $court->date_f,
                ];
            } */

            return ApiResponse::success("datos", 200, [$corte]);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 420);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CurrentCutCreateRequest $request)
    {

        // Buscar si existe un registro con el area_id dado
        $currentCut = current_cut::where('area_id', $request->input('area_id'))->first();

        if ($currentCut) {
            // Si existe, actualizar el court_id
            $currentCut->court_id = $request->input('court_id');
            $currentCut->save();
        } else {
            // Si no existe, crear un nuevo registro
            $currentCut = current_cut::create($request->all());
        }


        return ApiResponse::success("agregado", 201, $currentCut);
    }

    /**
     * Display the specified resource.
     */
    public function show(current_cut $current_cut)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, current_cut $current_cut)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(current_cut $current_cut)
    {
        //
    }
}
