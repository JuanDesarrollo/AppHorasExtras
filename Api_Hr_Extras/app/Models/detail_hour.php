<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class detail_hour extends Model
{
    use HasFactory;
    protected $fillable = ['justification', 'extra_hour_id', 'rn', 'hed', 'hen','rdd', 'rdn', 'hedd','hedn'];


    public function extraHours(): BelongsTo
    {
        return $this->BelongsTo(extra_hour::class, 'extra_hour_id');
    }

    public function disapprovedHour(): HasMany
    {
        return $this->hasMany(disapproved_hour::class, 'detail_hour_id');
    }
}
