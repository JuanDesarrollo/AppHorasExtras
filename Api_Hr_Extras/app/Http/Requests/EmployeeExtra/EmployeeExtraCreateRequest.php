<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeExtraCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'employee_id' => 'required|exists:employees,id',
            'status' => 'required|string',
            'area' => 'required||exists:areas,id'
        ];
    }

    public function messages()
    {
        return [
            'employee_id.required' => 'El id del empleado no fue enviado',
            'status.required' => 'No se envio el estado',
            'area.required' => 'No se envio el area',
            'employee_id.exists' => 'El id del empleado existe',
            'status.string' => 'El estado debe ser una cadena de texto',
            'area.exists' => 'El area no existe'
        ];
    }
}
