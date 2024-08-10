<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class court extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'date_i', 'date_f', 'status', 'usuario_finalizador'];

    public function employeeExtras(): HasMany
    {
        return $this->hasMany(employee_extra::class, 'court_id');
    }
}
