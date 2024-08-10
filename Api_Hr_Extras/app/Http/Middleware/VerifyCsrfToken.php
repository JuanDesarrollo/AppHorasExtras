<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/login',
        'api/logout',
        'api/current_cut',
        'api/employee_extras*',
        'api/extra_hour*',
        'api/EnviarTodas',
        'api/JordanaMaxima',
        'api/HorasPorcentajes*',
        'api/eliminarEmpleado',
        'api/UpdateJustificacionHr',
        'api/horasPorEmpleado',
        'api/disapproved_hours',
        'api/indexContreolInternoNomina',
        'api/areasContreolInternoNomina',
        'api/HorasXempleadoXcorte',
        'api/mng',
        'api/corte*',
        'api/UpdateCorte*',
        'api/employe_programcion_temp*',
        'api/Employee_copiarHr',
        'api/Employee_pegarHr',
        'api/DeleteTemp_employee*',
        'api/programacion*',
        'api/ProgramacionEmpleado',
        'api/admin',
        'api/Roles',
        'api/all_user',
        'api/deleteUser*'

    ];
}
