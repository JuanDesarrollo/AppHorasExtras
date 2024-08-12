<?php

namespace App\Http\Requests\ExtraHour;

use Illuminate\Foundation\Http\FormRequest;

class ExtraHourCreateRequest extends FormRequest
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
            'extra_hours.*.employee_extra_id' => 'required|exists:employee_extras,id',
            'extra_hours.*.date_i'            => 'required|date',
            'extra_hours.*.date_f'            => 'required|date',
            'extra_hours.*.time_i'            => 'required|date_format:H:i',
            'extra_hours.*.time_f'            => 'required|date_format:H:i',
            'detail_hours.*.justification'    => 'required|string|string|max:1000'
        ];
    }

    public function messages()
    {
        return [
            'extra_hours.*.employee_extra_id.required' => 'No se recibio el id del empleado',
            'extra_hours.*.date_i.required'            => 'No se recibido la fecha inicial',
            'extra_hours.*.date_f.required'            => 'No se recibido la fecha final',
            'extra_hours.*.time_i.required'            => 'No se recibido la hora inicial',
            'extra_hours.*.time_f.required'            => 'No se recibido la hora final',
            'detail_hours.*.justification.required'    => 'La justificación',
            'extra_hours.*.employee_extra_id.exists' => 'El id dem empleado no existe',
            'extra_hours.*.date_i.date'            => 'La fecha inicial no es de tipo fecha',
            'extra_hours.*.date_f.date'            => 'La final inicial no es de tipo fecha',
            'extra_hours.*.time_i.date_format:H:i'            => 'El formato de la hora inical debe ser horas:minutos',
            'extra_hours.*.time_f.date_format:H:i'            => 'El formato de la hora final debe ser horas:minutos',
            'detail_hours.*.justification.string'    => 'La justificación debe ser una cadena de texto',
            'detail_hours.*.justification.max:1000'    => 'El maximo de caracteres es de 1000'

        ];
    }
}
