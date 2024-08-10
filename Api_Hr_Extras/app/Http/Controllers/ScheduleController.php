<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\employee;
use App\Models\schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\FlareClient\Api;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        try {

            $user = Auth::user();
            $role = $user->roles()->first()->name;

            $employee_id = employee::find($user->employee_id);


            if ($role == "Monitoreo_seg") {
                $schedules = Schedule::select(
                    'areas.name as area_name',
                    'schedules.id',
                    DB::raw('(select ct.name from courts ct where schedules.date BETWEEN ct.date_i and ct.date_f) as corte'),
                    'employees.name as employee_name',
                    'schedules.date',
                    'schedules.time_i',
                    'schedules.time_f',
                    'schedules.word',
                    'schedules.status'

                )
                    ->join('employees', 'employees.id', '=', 'schedules.employee_schedule_id')
                    ->join('areas', 'areas.id', '=', 'employees.area_id')
                    ->where("schedules.status", "Aprobado")
                    ->orderBy('schedules.date', 'desc')
                    ->get();
            } else {
                $schedules = Schedule::select(
                    'schedules.id',
                    DB::raw('(select ct.name from courts ct where schedules.date BETWEEN ct.date_i and ct.date_f) as corte'),
                    'employees.name as employee_name',
                    'schedules.date',
                    'schedules.time_i',
                    'schedules.time_f',
                    'schedules.word',
                    'schedules.status'
                )
                    ->join('employees', 'employees.id', '=', 'schedules.employee_schedule_id')
                    ->where("employees.area_id", $employee_id->area_id)
                    ->get();
            }

            return ApiResponse::success("ok", 200, $schedules);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {


            $request->validate([
                "employee_schedule_id" => "required||exists:employees,id",
                "date" => "required",
                "time_i" => "required",
                "time_f" => "required",
                "word" => "required",
                "status" => "required|string|max:1000"
            ]);

            $data = schedule::create($request->all());

            return ApiResponse::success("Programación creada", 200, [$data]);
        } catch (\Throwable $th) {
            return  ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(schedule $schedule)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, schedule $schedule, $id)
    {
        try {
            $request->validate([
                "status" => "required"
            ]);
            $dat = $schedule->findOrFail($id);

            $dat->update($request->all());

            return ApiResponse::success("Realizado", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(schedule $schedule, $id)
    {
        try {
            $data = schedule::find($id);
            $data->delete();
            return ApiResponse::success("Eliminado", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    public function ProgramacionEmpleado(Request $request)
    {
        try {
            $request->validate([
                "empleado_id" => "required",
                "corte_id" => "required"
            ]);

            $data  = DB::table('schedules as pr')
                ->join('courts as ct', function ($join) {
                    $join->on('pr.date', '>=', 'ct.date_i')
                        ->on('pr.date', '<=', 'ct.date_f');
                })
                ->select('pr.date', 'pr.time_i', 'pr.time_f', 'pr.word')
                ->where('pr.employee_schedule_id', $request->empleado_id)
                ->where('pr.status', 'Aprobado')
                ->where('ct.id', $request->corte_id)
                ->get();
            return ApiResponse::success("OK", 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }
}
