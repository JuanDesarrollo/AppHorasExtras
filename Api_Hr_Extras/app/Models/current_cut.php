<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class current_cut extends Model
{
    use HasFactory;
    protected $fillable = ['court_id', 'area_id'];

    /*     public function court():BelongsTo
         {
             return $this->belongsTo(court::class);
         }
    
         public function area():BelongsTo
         {
             return $this->belongsTo(area::class);
         } */
}
