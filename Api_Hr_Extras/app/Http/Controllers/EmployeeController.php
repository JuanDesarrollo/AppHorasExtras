<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\court;
use App\Models\current_cut;
use App\Models\detail_hour;
use App\Models\employee;
use App\Models\employee_extra;
use App\Models\extra_hour;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Obtiene el usuario autenticado
            $user = Auth::user();
            $userId = $user->employee_id; 
            
            $employe = employee::find($userId)->area_id;
            return ApiResponse::success("datos", 200, Employee::where('area_id', $employe)->get());
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
    public function show(employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(employee $employee)
    {
        //
    }



    public function Employee_copiarHr()
    {
        try {
            $user = Auth::user();
            $userId = $user->employee_id;
            $employe = employee::find($userId)->area_id;
            $empleados = employee::where("area_id", $employe)
                ->whereHas("employeeExtras")
                ->get();
            return ApiResponse::success("HORAS PEGADAS", 200, $empleados);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un err", 420);
        }
    }

    public function Employee_pegarHr(Request $request)
    {
        try {
            $request->validate([
                "employe_copiado" => "required",
                "employee_pegar" => "required"
            ]);

            $user = Auth::user()->employee_id;
            $employe = employee::find($user)->area_id;
            $area = area::find($employe)->id;

            //$current_c = current_cut::select("court_id")->where("area_id",  $area)->get();
            $corteActual =  court::where('status', 'abierto')->first()->id;

            $corte = court::find($corteActual)->id;


            $id_emp_ext = employee_extra::whereIn("employee_id", $request->employe_copiado)
                ->where("court_id", $corte)
                ->select("id")->pluck("id");
            //$hr_Ext = extra_hour::whereIn("employee_extra_id",[ $id_emp_ext])->get();

            $hr_Ext = extra_hour::whereIn("employee_extra_id", [$id_emp_ext])->get();
            $id_original = $hr_Ext;
            // Valor externo que deseas asignar a `employee_extra_id`
            $external_value = employee_extra::whereIn("employee_id", [$request->employee_pegar])
                ->where("court_id", $corte)->pluck("id"); // Reemplaza esto con el valor deseado
            // Modificar cada objeto en la colección para cambiar `employee_extra_id`


            $details = detail_hour::whereIn("extra_hour_id", $id_original->pluck("id"))->get();

            // Crear instancias de extra_hour
            $createdHours = $hr_Ext->map(function ($item) use ($external_value) {
                return extra_hour::create([
                    "employee_extra_id" => $external_value[0], // Asegúrate de que $external_value sea un array con al menos un elemento
                    "date_i" => $item->date_i,
                    "date_f" => $item->date_f,
                    "time_i" => $item->time_i,
                    "time_f" => $item->time_f,
                    "status" => "creador"
                ]);
            });

            $id_new_hr = $createdHours->pluck("id");

            $details->each(function ($detail, $item) use ($id_new_hr) {
                detail_hour::create([
                    "extra_hour_id" => $id_new_hr[$item], // Asignar el ID de la nueva instancia de extra_hour
                    "rn" => $detail->rn,
                    "hed" => $detail->hed,
                    "hen" => $detail->hen,
                    "rdd" => $detail->rdd,
                    "rdn" => $detail->rdn,
                    "hedd" => $detail->hedd,
                    "hedn" => $detail->hedn,
                    "justification" => $detail->justification
                ]);
            });

            return ApiResponse::success("Horas pegadas", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un err", 420);
        }
    }

    public function all_employees()
    {
        try {
            $data = employee::all();
            return ApiResponse::success("Succes", 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }
}
