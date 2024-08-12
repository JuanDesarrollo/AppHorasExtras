<?php

namespace App\Http\Requests\CurrentCut;

use Illuminate\Foundation\Http\FormRequest;

class CurrentCutCreateRequest extends FormRequest
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
            'court_id' => 'required|exists:courts,id',
            'area_id'  => 'required|exists:areas,id'
        ];
    }

    public function messages()
    {
        return [
            'court_id.required' => 'No se envio el corte de asociación',
            'area_id.required'  => 'No se envio el area de asociación',
            'court_id.exists' => 'El id del corte no existe',
            'area_id.exists'  => 'El id del área no existe'
        ];
    }
}
