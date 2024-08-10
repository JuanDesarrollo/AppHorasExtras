<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class employee_extra extends Model
{
    use HasFactory;

    protected $fillable = ['employee_id', 'court_id', 'status'];

    public function employee():BelongsTo
    {
        return $this->belongsTo(employee::class,'employee_id');
    }

    public function court():BelongsTo
    {
        return $this->belongsTo(court::class, 'court_id');
    }

    public function extraHours():HasMany
    {
        return $this->hasMany(extra_hour::class, 'employee_extra_id');
    }
}
