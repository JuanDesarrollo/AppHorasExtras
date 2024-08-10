<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\court;
use App\Models\current_cut;
use App\Models\employee;
use App\Models\extra_hour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HorasExtrasController extends Controller
{
    public function EnviarTodas(Request $request)
    {
        try {
            $request->validate([
                'status' => 'required',
                'id' => 'required'
            ]);

            $userT = Auth::user();
            $role = $userT->roles()->first(); // Obtener el primer rol del usuario

            $filter = '';
            // Verificar el rol y aplicar condiciones de filtro
            if ($role->name === 'creador') {
                $filter =  ['creador', 'dp_jefe', 'dp_nomina', 'dp_control_interno'];
            } else if ($role->name === 'jefe') {
                $filter =  ['Jefe', 'dp_nomina', 'dp_control_interno'];
            }



            $user = Auth::user()->employee_id;
            $employe = employee::find($user)->area_id;
            $area = area::find($employe)->id;
            $id = $request->id;
            $corteActual =  court::where('status', 'abierto')->first()->id;
           // $corteActual = current_cut::where("area_id", $area)->first()->court_id;
            $extraHours = extra_hour::whereHas('employeeExtras', function ($query) use ($area, $corteActual, $id, $filter) {
                $query->where('court_id', $corteActual)
                    ->whereIn('id', $id)
                    ->whereIn('extra_hours.status', $filter)
                    ->whereHas('employee', function ($subQuery) use ($area) {
                        $subQuery->where('area_id', $area);
                    });
            })->select('id')->get();


            // Recorrer los IDs y actualizar cada registro
            foreach ($extraHours as $extraHour) {
                extra_hour::where('id', $extraHour['id'])
                    ->update(['status' => $request->status]); // Aquí actualiza el campo que necesites
            }

            return ApiResponse::success('Horas enviadas', 200, []);
        } catch (\Exception $exception) {
        }
    }
}
