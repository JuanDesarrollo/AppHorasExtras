<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\ControlNominaController;
use App\Http\Controllers\CourtController;
use App\Http\Controllers\CurrentCutController;
use App\Http\Controllers\DisapprovedHourController;
use App\Http\Controllers\EmailEmployeeController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeExtraController;
use App\Http\Controllers\EmployeeTemporaryProgrammingController;
use App\Http\Controllers\ExtraHourController;
use App\Http\Controllers\HorasExtrasController;
use App\Http\Controllers\HorasPorcentajesController;
use App\Http\Controllers\InformesController;
use App\Http\Controllers\JornadaMaximaController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\ScheduleController;
use App\Mail\NotificadorMail;
use App\Models\JornadaMaxima;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Contracts\Role;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */


Route::post('login', [AuthController::class, 'login']);
Route::post('registrar', [AuthController::class, 'registrar']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout',  [AuthController::class, 'logout']);
    Route::get('userProfile', [AuthController::class, 'userProfile']);
    Route::post('EnviarTodas', [HorasExtrasController::class, 'EnviarTodas']);
    Route::apiResource('employee', EmployeeController::class);
    Route::apiResource('JordanaMaxima', JornadaMaximaController::class);
    Route::apiResource('HorasPorcentajes', HorasPorcentajesController::class);
    Route::patch('/HorasPorcentajes/{id}', [HorasPorcentajesController::class, 'update']);
    Route::apiResource('areas', AreaController::class);
    Route::apiResource('employee_extras', EmployeeExtraController::class);
    Route::apiResource('extra_hour', ExtraHourController::class);
    Route::apiResource('cortes', CourtController::class);
    Route::patch('/cortes/{id}', [CourtController::class, 'update']);
    Route::patch('/UpdateCorte/{id}', [CourtController::class, 'UpdateCorte']);


    Route::apiResource('current_cut', CurrentCutController::class);
    Route::post('eliminarEmpleado',  [EmployeeExtraController::class, 'eliminarEmpleado']);
    Route::post('UpdateJustificacionHr',  [ExtraHourController::class, 'UpdateJustificacionHr']);
    Route::post('horasPorEmpleado',  [EmployeeExtraController::class, 'horasPorEmpleado']);
    Route::get('horas_porcentaje',  [EmployeeExtraController::class, 'horas_porcentaje']);
    Route::apiResource('disapproved_hours', DisapprovedHourController::class);
    Route::get('indexContreolInternoNomina', [ControlNominaController::class, 'CortesHr']);
    Route::post('areasContreolInternoNomina', [ControlNominaController::class, 'AreasHr']);
    Route::post('HorasXempleadoXcorte', [ControlNominaController::class, 'EmpleadosHr']);
    Route::post('mng', [InformesController::class, 'mng']);
    Route::apiResource('employe_programcion_temp', EmployeeTemporaryProgrammingController::class);
    Route::get('Employee_copiarHr', [EmployeeController::class, "Employee_copiarHr"]);
    Route::post('Employee_pegarHr', [EmployeeController::class, "Employee_pegarHr"]);
    Route::apiResource('programacion', ScheduleController::class);
    Route::post('ProgramacionEmpleado', [ScheduleController::class, "ProgramacionEmpleado"]);
    Route::get('all_employees', [EmployeeController::class, "all_employees"]);
    Route::apiResource('Roles', RolController::class);
    Route::get('all_user', [RolController::class, "all_user"]);
    Route::delete('deleteUser/{id}', [RolController::class, "deleteUser"]);
});
