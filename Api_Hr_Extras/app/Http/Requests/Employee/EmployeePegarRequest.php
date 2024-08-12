<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;

class EmployeePegarRequest extends FormRequest
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
            "employe_copiado" => "required",
            "employee_pegar" => "required"
        ];
    }

    public function messages()
    {
        return [
            "employe_copiado.required" => "Empleado a copiar no enviados",
            "employee_pegar.required" => "Empleado a pegar no enviados"
        ];
    }
}
