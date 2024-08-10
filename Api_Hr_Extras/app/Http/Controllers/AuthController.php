<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use App\Models\area;
use App\Models\employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function registrar(Request $request)
    {

        try {
            $request->validate([
                'employee_id' => 'required|exists:employees,id',
                'user' => 'required',
                'password' => 'required|confirmed'
            ]);


            $user = User::create([
                "employee_id" => $request->employee_id,
                "user" => $request->user,
                "password" => Hash::make($request->password)
            ]);

            return ApiResponse::success("Registrado", 201, $user);
        } catch (\Exception $th) {
            return ApiResponse::error("Error al registarse", 402);
        }
    }

    public function login(Request $request)
    {
        try {

            $credentials = $request->validate([
                'user' => 'required',
                'password' => 'required'
            ]);

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $role = $user->roles()->first(); // Obtener el primer rol del usuario
                // $user = User::where('user', $request->user);
                $permisos = $role->permissions;
                $nombre = employee::select('name', 'position', 'document', 'area_id')->find($user->employee_id);
                $area = area::find($nombre->area_id);

                $areaName = strtolower(substr($area->name, 0, 10));
                $formattedAreaName = ucfirst($areaName);



                return response()->json([
                    'status' => true,
                    'message' => 'login exitoso',
                    'data' => $user,
                    'rol' => $role->name,
                    'permisos' => $permisos ,
                    'area' => $formattedAreaName,
                    'nombre' => $nombre,
                    'token' => $user->createToken('API TOKEN')->plainTextToken
                ], 200);

                //  $token = $user->createToken('token')->plainTextToken;
                //$cookie = cookie('cookie_token', $token, 60 * 24);
                //return ApiResponse::success("login exitoso", 200, $token)->withoutCookie($cookie);
                // return response(["token" => $token], Response::HTTP_OK)->withoutCookie($cookie);
            } else {
                return ApiResponse::error("Usuario o contraseña incorrecto", 400);
                // return response(["message" => "Credenciales inválidas"], Response::HTTP_UNAUTHORIZED);
            }
        } catch (\Exception $e) {
            // Registra la excepción para propósitos de depuración
            Log::error('Excepción durante el proceso de autenticación: ' . $e->getMessage());

            // Devuelve una respuesta de error genérica
            return ApiResponse::error("Ha ocurrido un error durante el proceso de autenticación", 500);
        }
    }

    public function userProfile(Request $request)
    {

        try {
            return ApiResponse::success("autorizado", 201, auth()->user());
        } catch (\Exception $th) {
            return ApiResponse::error($th->getMessage(), 400);
        }
    }

    public function logout(Request $request)
    {
        try {
            auth()->user()->tokens()->delete();
            return ApiResponse::success("Sesión cerrada", 200, []);
        } catch (\Exception $exception) {
            // Registra la excepción para propósitos de depuración
            Log::error('Excepción durante el proceso de cierre de sesión: ' . $exception->getMessage());
            // Devuelve una respuesta de error genérica
            return ApiResponse::error("Ha ocurrido un error durante el proceso de cierre de sesión", 500);
        }
    }

}
