<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class area extends Model
{
    use HasFactory;

         protected $fillable = ['nombre', 'Company_code'];

        public function current_cut(): HasMany
        {
            return $this->hasMany(current_cut::class);
        }
    
        public function employee(): HasMany
        {
            return $this->hasMany(employee::class, 'area_id');
        }
}
