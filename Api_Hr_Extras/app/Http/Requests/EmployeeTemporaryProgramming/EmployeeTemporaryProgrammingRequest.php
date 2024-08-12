<?php

namespace App\Http\Requests\EmployeeTemporaryProgramming;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeTemporaryProgrammingRequest extends FormRequest
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
            "employee_id" => "required"
        ];
    }

    public function messages()
    {
        return [
            "employee_id.required" => "No se envio al empleado"
        ];
    }
}
