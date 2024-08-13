<?php

namespace App\Http\Controllers;

use App\Events\HorasExtrasEvent;
use App\Http\Requests\HorasExtras\EnviarTodasRequest;
use App\Http\Responses\ApiResponse;
use App\Mail\NotificadorMail;
use App\Models\area;
use App\Models\court;
use App\Models\current_cut;
use App\Models\employee;
use App\Models\extra_hour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class HorasExtrasController extends Controller
{
    public function EnviarTodas(EnviarTodasRequest $request)
    {
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

        //  Mail::to('ju4np4765@gmail.com')->send(new NotificadorMail);
        HorasExtrasEvent::dispatch($userT);
        return ApiResponse::success('Horas enviadas', 200, []);
    }
}
