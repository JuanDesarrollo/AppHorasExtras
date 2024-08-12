<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeExtraCreateRequest;
use App\Http\Requests\EmployeeExtras\EliminarEmpleadoRequest;
use App\Http\Requests\EmployeeExtras\EmployeeExtraUpdateRequest;
use App\Http\Requests\EmployeeExtras\HorasPorEmpleadoRequest;
use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\court;
use App\Models\current_cut;
use App\Models\employee;
use App\Models\employee_extra;
use App\Models\extra_hour;
use App\Models\HorasPorcentajes;
use App\Models\JornadaMaxima;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EmployeeExtraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $role = $user->roles()->first(); // Obtener el primer rol del usuario
            $employe = employee::find($user->employee_id)->area_id;
            $area = area::find($employe)->id;
            $corteActual =  court::where('status', 'abierto')->first()->id;
            //   $corteActual =    current_cut::where("area_id", $area)->first()->court_id;

            //current_cut::where("area_id", $area)->first()->court_id;
            if ($role->name === 'creador') {
                $employees =  employee_extra::where('court_id', $corteActual)
                    ->whereHas('employee', function ($query) use ($area) {
                        $query->where('area_id', $area);
                    })
                    ->with(['employee' => function ($query) use ($area) {
                        $query->where('area_id', $area);
                    }])
                    ->get();
            } else if ($role->name === 'jefe') {
                $valorHora = DB::table('jornada_maximas')
                    ->select('horas_mes')
                    ->where('id', function ($query) use ($employe) {
                        $query->select(DB::raw('case when ' . $employe . '=2 then 2 else 1 end'));
                    })
                    ->first();

                $employees = employee_extra::whereHas('employee', function ($query) use ($area, $corteActual) {
                    $query->where('area_id', $area)
                        ->where('court_id', $corteActual);
                })
                    ->whereHas('extraHours', function ($query) {
                        $query->whereIn('status', ['Jefe', 'dp_contro_interno', 'dp_nomina']);
                    })
                    ->with([
                        'employee' => function ($query) use ($area) {
                            $query->where('area_id', $area);
                        },
                        'extraHours' => function ($query) {
                            $query->whereIn('status', ['Jefe', 'ap_jefe'])->with('detailHours');
                        }
                    ])
                    ->get();

                // Añadir el campo 'valorHora' a cada objeto 'employee'
                $employees->each(function ($employee) use ($valorHora) {
                    $employee->employee->valorHora = $valorHora;
                });;
            }

            // Devuelve los datos en formato JSON
            return ApiResponse::success("success", 201, $employees);
        } catch (\Exception $e) {
            return ApiResponse::error("Ocurrio un error o el corte no ha sido seleccionado", 401);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeExtraCreateRequest $request)
    {
        //$employe = current_cut::where("area_id", $request->area)->first();
        $corteActual =  court::where('status', 'abierto')->first()->id;
        $daa = employee_extra::where("employee_id", $request->employee_id)
            ->where("court_id", $corteActual)
            ->get();


        if ($daa->isEmpty()) {
            $employee_extra = employee_extra::create(
                [
                    "employee_id" => $request->employee_id,
                    "court_id" => $corteActual,
                    "status" => $request->status
                ]
            );

            return ApiResponse::success("Agregado con exito", 201, $employee_extra);
        } else {
            return ApiResponse::error("Este empleado ya está agregado", 401, []);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(employee_extra $employee_extra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeExtraUpdateRequest $request, employee_extra $employee_extra)
    {

        // Actualizar el registro con los datos validados
        $employee_extra->update($request->all());

        return ApiResponse::success("Realizado", 201, []);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(employee_extra $employee_extra)
    {
        try {

            $employee_extra->delete();
            return ApiResponse::success("eliminado", 200);
        } catch (Exception $e) {
            return ApiResponse::error("algo slaio mal", 400);
        }
    }



    public function eliminarEmpleado(EliminarEmpleadoRequest $request)
    {
        $ids = $request->id;

        try {

            $dt = employee_extra::whereIn('id', $ids)->delete();

            return ApiResponse::success("eliminado", 200);
        } catch (Exception $e) {
            return ApiResponse::error("algo slaio mal", 400);
        }
    }

    public function horasPorEmpleado(HorasPorEmpleadoRequest $request)
    {

        $user = Auth::user();
        $role = $user->roles()->first(); // Obtener el primer rol del usuario

        $filter = '';
        // Verificar el rol y aplicar condiciones de filtro
        if ($role->name === 'creador') {
            $filter =  ['Jefe', 'creador', 'dp_jefe', 'ap_jefe', 'dp_nomina', 'ap_nomina',   'ap_control_interno', 'dp_control_interno'];
        } else if ($role->name === 'jefe') {
            $filter =  ['Jefe',  'dp_nomina', 'dp_control_interno'];
        }

        // Continuar con las condiciones y las relaciones

        $employees = extra_hour::whereIn('status', $filter)
            ->where('employee_extra_id', $request->id)
            ->with('detailHours.disapprovedHour.user')->get();

        // Devuelve los datos en formato JSON
        return ApiResponse::success("success", 201, $employees);
    }

    public function horas_porcentaje()
    {
        try {
            $horas_porcentaje = HorasPorcentajes::all();
            return ApiResponse::success("success", 201, $horas_porcentaje);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error ", 401);
        }
    }
}
