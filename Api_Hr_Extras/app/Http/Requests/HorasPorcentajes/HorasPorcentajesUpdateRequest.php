<?php

namespace App\Http\Requests\HorasPorcentajes;

use Illuminate\Foundation\Http\FormRequest;

class HorasPorcentajesUpdateRequest extends FormRequest
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
            "conceptos" => 'required',
            "porcentaje" => 'required',
            "company_code" => 'required',
            "company_code_seguridad" => 'required',
        ];
    }

    public function messages()
    {
        return [
            "conceptos.required" => 'El concepto es requerido',
            "porcentaje.required" => 'El porcentaje es requerido',
            "company_code.required" => 'El company_code es requerido',
            "company_code_seguridad.required" => 'El company_code_seguridad es requerido'
        ];
    }
}
