<?php

namespace App\Http\Requests\Court;

use Illuminate\Foundation\Http\FormRequest;

class CourtEstadoUpdateRequest extends FormRequest
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
            'status' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'status.required' => 'No se envio el nuevo estado',
        ];
    }
}
