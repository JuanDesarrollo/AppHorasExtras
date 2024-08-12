<?php

namespace App\Http\Requests\HorasExtras;

use Illuminate\Foundation\Http\FormRequest;

class EnviarTodasRequest extends FormRequest
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
            'status' => 'required',
            'id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'El estado es requerido',
            'id.required' => 'El id de las horas es requerido'
        ];
    }
}
