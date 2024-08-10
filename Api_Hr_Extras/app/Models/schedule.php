<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class schedule extends Model
{
    use HasFactory;
    protected $fillable = ['employee_schedule_id', 'date', 'time_i', 'time_f', 'word', 'status'];

    public function employee_Schedule(): BelongsTo
    {
        return $this->belongsTo(employee_schedule::class);
    }
}
