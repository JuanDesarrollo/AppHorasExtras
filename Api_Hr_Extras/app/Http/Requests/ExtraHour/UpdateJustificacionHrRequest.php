<?php

namespace App\Http\Requests\ExtraHour;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJustificacionHrRequest extends FormRequest
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
            'id' => 'required|exists:extra_hours,id',
            'justificacion' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'id.required' => 'No se envio el id de la hora extra',
            'justificacion.required' => 'No se envio la justificación',
            'id.exists' => 'El id de la hora extra no existe'
        ];
    }
}
