<?php

namespace App\Http\Requests\Court;

use Illuminate\Foundation\Http\FormRequest;

class CourtCreateRequest extends FormRequest
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
            "name" => "required",
            "date_i" => "required",
            "date_f" => "required"
        ];
    }

    public function messages()
    {
        return [
            "name.required" => "El nombre del corte es requerido",
            "date_i.required" => "Se requiere una fecha de inicio",
            "date_f.required" => "Se requiere una fecha de finalización"
        ];
    }
}
