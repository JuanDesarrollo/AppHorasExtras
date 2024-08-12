<?php

namespace App\Http\Requests\EmployeeExtras;

use Illuminate\Foundation\Http\FormRequest;

class HorasPorEmpleadoRequest extends FormRequest
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
            "id" => 'required|exists:employee_extras,id'
        ];
    }
    public function messages()
    {
        return [
            "id.required" => 'El id del empleado no se envio',
            "id.exists" => 'El empleado no existe en BD',
        ];
    }
}
