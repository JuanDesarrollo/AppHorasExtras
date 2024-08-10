<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class employee extends Model
{
    use HasFactory;

    protected $fillable = ['document', 'name', 'position', 'status', 'salary', 'area_id'];


    public function area(): BelongsTo
    {
        return $this->belongsTo(area::class, 'area_id');
    }

      public function employeeTemporaryProgramming(): BelongsTo
    {
        return $this->belongsTo(EmployeeTemporaryProgramming::class, "employee_id");
    }

    public function user(): HasMany
    {
        return $this->hasMany(User::class);
    }


    public function employeeExtras(): HasMany
    {
        return $this->hasMany(employee_extra::class, 'employee_id');
    }
}
