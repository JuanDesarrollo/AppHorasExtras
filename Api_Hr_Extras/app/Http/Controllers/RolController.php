<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Rol;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $data = Role::all();
            return ApiResponse::success("Succes", 200, $data);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    public function all_user()
    {
        try {
            $results = DB::table('users as us')
                ->join('employees as emp', 'us.employee_id', '=', 'emp.id')
                ->join('areas as ar', 'ar.id', '=', 'emp.area_id')
                ->join('model_has_roles as mr', 'mr.model_id', '=', 'us.id')
                ->join('roles as rl', 'mr.role_id', '=', 'rl.id')
                ->select(
                    'us.id',
                    'rl.name as rol_name',
                    'ar.name as area_name',
                    'us.user',
                    'emp.document',
                    'emp.name as employee_name',
                    'emp.position'
                )
                ->get();
            return ApiResponse::success("Succes", 200, $results);
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
                "employee_id" => "required|exists:employees,id",
                'user' => "required|string|min:6",
                'password' => "required|confirmed|string|min:4",
                'rol' => "required"
            ]);
            foreach ($request->employee_id as $user_id) {
                User::create([
                    'employee_id' => $user_id,
                    'user' => $request->user,
                    'password' => Hash::make($request->password)
                ])->assignRole($request->rol);
            }

            return ApiResponse::success("Usuario creado", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Rol $rol)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rol $rol)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rol $rol, $id)
    {
    }

    public function deleteUser(User $user, $id)
    {
        try {
            $dta = $user->find($id);
            $dta->delete();
            return ApiResponse::success("Usuario eliminado", 200, []);
        } catch (\Throwable $th) {
            return ApiResponse::error("Ocurrio un error", 400, []);
        }
    }
}
