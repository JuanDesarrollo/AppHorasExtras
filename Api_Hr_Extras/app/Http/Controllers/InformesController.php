<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\employee;
use App\Models\employee_extra;
use App\Models\HorasPorcentajes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InformesController extends Controller
{
    public function mng(Request $request)
    {
        try {
            $request->validate([
                'id_corte' => 'required',
            ]);


            $id_area = $request->id_area;
            $id_corte = $request->id_corte;

            $query = DB::table('employees as EMP')
                ->join('employee_extras as EMP_E', 'EMP.id', '=', 'EMP_E.employee_id')
                ->join('extra_hours as EXT_H', 'EXT_H.employee_extra_id', '=', 'EMP_E.id')
                ->join('detail_hours as dt', 'EXT_H.id', '=', 'dt.extra_hour_id')
                ->select(
                    'EMP.document',
                    DB::raw('sum(dt.hen) as cant'),
                    DB::raw('(select hp.conceptos from horas_porcentajes hp where hp.id=3) as detalle'),
                    DB::raw('(select hp.porcentaje from horas_porcentajes hp where hp.id=3) as porcentaje'),
                    DB::raw('(select hp.company_code from horas_porcentajes hp where hp.id=3) as cause')
                )
                ->where('EMP_E.court_id', $id_corte)
                ->where('EXT_H.status', 'ap_jefe')
                ->where('dt.hen', '>', 0);

            if (!empty($id_area)) {
                $query->where('EMP.area_id', $id_area);
            }

            $query->groupBy('EMP.document');

            $unions = [
                ['column' => 'hef', 'id' => 2],
                ['column' => 'rdd', 'id' => 4],
                ['column' => 'rdn', 'id' => 5],
                ['column' => 'hedd', 'id' => 6],
                ['column' => 'hedn', 'id' => 7],
                ['column' => 'rn', 'id' => 1],
            ];

            foreach ($unions as $union) {
                $unionQuery = DB::table('employees as EMP')
                    ->join('employee_extras as EMP_E', 'EMP.id', '=', 'EMP_E.employee_id')
                    ->join('extra_hours as EXT_H', 'EXT_H.employee_extra_id', '=', 'EMP_E.id')
                    ->join('detail_hours as dt', 'EXT_H.id', '=', 'dt.extra_hour_id')
                    ->select(
                        'EMP.document',
                        DB::raw('sum(dt.' . $union['column'] . ') as cant'),
                        DB::raw('(select hp.conceptos from horas_porcentajes hp where hp.id=' . $union['id'] . ') as detalle'),
                        DB::raw('(select hp.porcentaje from horas_porcentajes hp where hp.id=' . $union['id'] . ') as porcentaje'),
                        DB::raw('(select hp.company_code from horas_porcentajes hp where hp.id=' . $union['id'] . ')')
                    )
                    ->where('EMP_E.court_id', $id_corte)
                    ->where('EXT_H.status', 'ap_jefe')
                    ->where('dt.' . $union['column'], '>', 0);

                if (!empty($id_area)) {
                    $unionQuery->where('EMP.area_id', $id_area);
                }

                $unionQuery->groupBy('EMP.document');

                $query->union($unionQuery);
            }

            // Ordenar por document
            $result = DB::table(DB::raw("({$query->toSql()}) as sub"))
                ->mergeBindings($query)
                ->orderBy('sub.document')
                ->get();

            return ApiResponse::success('sucess', 200, $result);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
