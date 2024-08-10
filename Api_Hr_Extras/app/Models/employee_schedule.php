<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class employee_schedule extends Model
{
    use HasFactory;

    public function employee(): BelongsTo
    {
        return $this->belongsTo(employee::class);
    }

    public function schedule(): HasMany
    {
        return $this->hasMany(schedule::class);
    }
}
