<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\detail_hour;
use App\Models\employee_extra;
use App\Models\extra_hour;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class ExtraHourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {


            $request->validate([
                'extra_hours.*.employee_extra_id' => 'required|exists:employee_extras,id',
                'extra_hours.*.date_i'            => 'required|date',
                'extra_hours.*.date_f'            => 'required|date',
                'extra_hours.*.time_i'            => 'required|date_format:H:i',
                'extra_hours.*.time_f'            => 'required|date_format:H:i',
                'detail_hours.*.justification'    => 'required|string|string|max:1000'
            ]);


            $extra_hour = extra_hour::create(
                [
                    'employee_extra_id' =>  $request->extra_hours[0]['employee_extra_id'],
                    'date_i'            => $request->extra_hours[0]['date_i'],
                    'date_f'            => $request->extra_hours[0]['date_f'],
                    'time_i'            =>  Carbon::createFromFormat('H:i', $request->extra_hours[0]['time_i'])->format('H:i'), //$request->extra_hours[0]['time_i'],
                    'time_f'            =>  Carbon::createFromFormat('H:i', $request->extra_hours[0]['time_f'])->format('H:i'), //extra_hours[0]['time_f'],
                    'status'            => $request->extra_hours[0]['status']
                ]
            );

            $key2 = $extra_hour->id;

            $detail_hour = detail_hour::create(
                [
                    'extra_hour_id' => $key2,
                    'rn' => $request->detail_hours[0]['rn'],
                    'hed' => $request->detail_hours[0]['hed'],
                    'hen' => $request->detail_hours[0]['hen'],
                    'rdd' => $request->detail_hours[0]['rdd'],
                    'rdn' => $request->detail_hours[0]['rdn'],
                    'hedd' => $request->detail_hours[0]['hedd'],
                    'hedn' => $request->detail_hours[0]['hedn'],
                    'justification' => $request->detail_hours[0]['justification']
                ]
            );

            return ApiResponse::success("agregado", 201, []);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 401);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(extra_hour $extra_hour)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, extra_hour $extra_hour)
    {

        try {
            // Validar la solicitud
            $validatedData = $request->validate([
                'status' => 'required',
                // Agrega otras reglas de validación según sea necesario
            ]);
            // Actualizar el registro con los datos validados
            $extra_hour->update($validatedData);



            return ApiResponse::success("Realizado", 201, [$extra_hour]);
        } catch (\Throwable $th) {
            return ApiResponse::error('Ocurrio un error', []);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(extra_hour $extra_hour)
    {
        try {
            $extra_hour->delete();
            return ApiResponse::success("eliminado", 200);
        } catch (Exception $e) {
            return ApiResponse::error($e->getMessage(), 400);
        }
    }

    public function UpdateJustificacionHr(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:extra_hours,id',
            'justificacion' => 'required'
        ]);

        try {

            $item = detail_hour::where("extra_hour_id", $request->id)->first();
            // Actualizar los campos del registro
            $item->justification = $request->justificacion;
            // Guardar los cambios en la base de datos
            $item->save();
            return ApiResponse::success("Datos", 200, $item);
        } catch (Exception $e) {
            return ApiResponse::error("algo slaio mal", 400);
        }
    }
}
