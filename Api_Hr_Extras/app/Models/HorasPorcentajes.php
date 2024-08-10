<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorasPorcentajes extends Model
{
    use HasFactory;

    protected $fillable = ['conceptos', 'porcentaje', 'company_code', 'company_code_seguridad', 'user'];

}
