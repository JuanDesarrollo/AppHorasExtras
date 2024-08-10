<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class disapproved_hour extends Model
{
    use HasFactory;
    protected $fillable = ['detail_hour_id', 'user_id', 'reason'];


    public function detailHour(): BelongsTo
    {
        return $this->belongsTo(detail_hour::class, 'detail_hour_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
