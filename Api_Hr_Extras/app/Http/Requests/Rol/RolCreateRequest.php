<?php

namespace App\Http\Requests\Rol;

use Illuminate\Foundation\Http\FormRequest;

class RolCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "employee_id" => "required|exists:employees,id",
            'user' => "required|string|min:6",
            'password' => "required|confirmed|string|min:4",
            'rol' => "required"
        ];
    }

    public function messages()
    {
        return [
            "employee_id.required" => "El empleado es requerido",
            'user.required' => "El usuario asignador es requerido",
            'password.required' => "Se requiere una clave",
            'rol.required' => "Se requiere el rol",
            "employee_id.exists" => "El empleado es no existe",
            'user.min:6' => "El usuario debe contener minimo 6 caracteres",
            'password.string|min:4' => "La clave debe contener al menos 4 caracteres",
            'password.confirmed' => "la clave se debe confirmar"
        ];
    }
}
