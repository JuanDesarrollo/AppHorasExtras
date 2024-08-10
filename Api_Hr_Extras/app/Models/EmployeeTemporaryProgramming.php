<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EmployeeTemporaryProgramming extends Model
{
    use HasFactory;
    protected $fillable = ['employee_id'];

    public function employee():HasOne
    {
        return $this->HasOne(employee::class, 'employee_id');

    }

}
