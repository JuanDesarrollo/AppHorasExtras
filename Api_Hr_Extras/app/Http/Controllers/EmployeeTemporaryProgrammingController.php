<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeTemporaryProgramming\EmployeeTemporaryProgrammingRequest;
use App\Http\Responses\ApiResponse;
use App\Models\employee;
use App\Models\EmployeeTemporaryProgramming;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeeTemporaryProgrammingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {

            $employee_id = Auth::user()->employee_id;
            $area_id = employee::find($employee_id)->area_id;
            $temp = EmployeeTemporaryProgramming::pluck('employee_id');
            $data = employee::where("area_id", $area_id)
                ->whereIn("id", $temp)
                ->get();
            return ApiResponse::success("Agregado", 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, $data);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeTemporaryProgrammingRequest $request)
    {
        $data = EmployeeTemporaryProgramming::create($request->all());
        return ApiResponse::success("Agregado", 200, $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(EmployeeTemporaryProgramming $employeeTemporaryProgramming)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EmployeeTemporaryProgramming $employeeTemporaryProgramming)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EmployeeTemporaryProgramming $employeeTemporaryProgramming, $id)
    {
        try {
            $temp = $employeeTemporaryProgramming::where("employee_id", $id)->get();
            $temp[0]->delete();

            return ApiResponse::success("Eliminado", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }
}
