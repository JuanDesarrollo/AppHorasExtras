<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class extra_hour extends Model
{
    use HasFactory;
    
    protected $fillable = ['date_i', 'date_f', 'time_i', 'time_f', 'status','employee_extra_id'];

    public function employeeExtras():BelongsTo
    {
        return $this->belongsTo(employee_extra::class, 'employee_extra_id');
    }

    public function detailHours():HasOne
    {
        return $this->HasOne(detail_hour::class, 'extra_hour_id');
    }
}
