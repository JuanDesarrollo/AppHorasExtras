<?php

namespace App\Http\Requests\DisapprovedHour;

use Illuminate\Foundation\Http\FormRequest;

class DisapprovedHourCreate extends FormRequest
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
            'reason' => 'required',
            'id' => 'required|exists:detail_hours,id'
        ];
    }
    public function messages()
    {
        return [
            'reason.required' => 'No se envio la justificación',
            'id.required' => 'No se envio el id de asociación',
            'id.exists' => 'El id de asociación no existe'
        ];
    }
}
