<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\court;
use App\Models\employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ControlNominaController extends Controller
{
    public function CortesHr()
    {
        try {
            $user = Auth::user();
            $role = $user->roles()->first();
            $idemployee_id_area = $user->employee_id;
            // $id_area = employee::where('id', $idemployee_id_area)->select("area_id")->get();
            $id_area = employee::where('id', $idemployee_id_area)->first();



            if ($role->name === 'nomina' || $role->name === 'controlInterno') {

                if ($role->name == 'controlInterno') {
                    $estadoPermitido = ['ap_jefe', 'ap_control_interno'];
                } else if ($role->name == 'nomina') {
                    $estadoPermitido = ['ap_control_interno'];
                }

                $data = court::whereHas('employeeExtras', function ($query)  use ($estadoPermitido) {
                    $query->whereHas('extraHours', function ($subQuery) use ($estadoPermitido) {
                        $subQuery->whereIn('status', $estadoPermitido);
                    });
                })->get();
            } else {
                $data = court::whereHas('employeeExtras', function ($query) use ($id_area) {
                    $query->whereHas('extraHours', function ($subQuery) {
                        $subQuery->where('status', 'ap_jefe');
                    })
                        ->whereHas('employee', function ($subQuery2) use ($id_area) {
                            $subQuery2->where('area_id',  $id_area->area_id);
                        });
                })->get();
            }

            return ApiResponse::success('Sucess', 200, $data);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function AreasHr(Request $request)
    {
        try {


            $request->validate([
                "court_id" => "required"
            ]);

            $corut_id = $request->court_id;

            $user = Auth::user();
            $role = $user->roles()->first();

            if ($role->name === 'nomina' || $role->name === 'controlInterno') {
                if ($role->name == 'controlInterno') {
                    $estadoPermitido = ['ap_jefe', 'ap_control_interno'];
                } else if ($role->name == 'nomina') {
                    $estadoPermitido = ['ap_control_interno'];
                }
                $data = area::whereHas('employee.employeeExtras.extraHours', function ($query) use ($corut_id, $estadoPermitido) {
                    $query->where('court_id', $corut_id);
                    $query->whereIn('status', $estadoPermitido);
                })->get();
            }

            return ApiResponse::success('Sucess', 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error('OCurrio un error', 400, []);
        }
    }


    public function EmpleadosHr(Request $request)
    {
        try {


            $request->validate([
                'corte_id' => 'required|exists:courts,id',
                'area_id' => 'required|exists:areas,id'
            ]);



            $user = Auth::user();
            $role = $user->roles()->first();




            $employe = employee::find($user->employee_id)->area_id;

            $valorHora = DB::table('jornada_maximas')
                ->select('horas_mes')
                ->where('id', function ($query) use ($employe) {
                    $query->select(DB::raw('case when ' . $employe . '=2 then 2 else 1 end'));
                })
                ->first();

            if ($role->name == 'controlInterno') {
                $estadoPermitido = ['ap_jefe', 'ap_control_interno'];
            } else if ($role->name == 'nomina') {
                $estadoPermitido = ['ap_control_interno'];
            } else {
                $estadoPermitido = ['ap_jefe'];
            }

            $data = employee::where('area_id', $request->area_id)
                ->whereHas('employeeExtras', function ($query) use ($request, $estadoPermitido) {
                    $query->where('court_id', $request->corte_id)
                        ->whereHas('extraHours', function ($subQuery) use ($estadoPermitido) {
                            $subQuery->where('status', '!=', 'dp_nomina');
                            $subQuery->whereIn('status', $estadoPermitido);
                        });
                })
                ->with(['employeeExtras' => function ($query) use ($request, $estadoPermitido) {
                    $query->where('court_id', $request->corte_id)
                        ->with(['extraHours' => function ($subQuery) use ($estadoPermitido) {
                            $subQuery->whereIn('status', $estadoPermitido);
                            $subQuery->where('status', '!=', 'dp_nomina')
                                ->with('detailHours')
                                ->with('detailHours.disapprovedHour.user'); // Si también necesitas filtrar por detailHours
                        }]);
                }])
                ->get();


            // Añadir el campo 'valorHora' a cada objeto 'employee'
            $data->each(function ($employee) use ($valorHora) {
                $employee->valorHora = $valorHora;
            });



            return ApiResponse::success('Sucess', 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error('OCurrio un error', 400, []);
        }
    }
}
