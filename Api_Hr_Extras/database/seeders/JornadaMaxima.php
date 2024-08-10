<?php

namespace Database\Seeders;

use App\Models\JornadaMaxima as ModelsJornadaMaxima;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JornadaMaxima extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        ModelsJornadaMaxima::create(['Tipo_jornada' => 'Administrativo', 'Horas_maxima' => 7.66, 'horas_mes'=>230]);
        ModelsJornadaMaxima::create(['Tipo_jornada' => 'Seguridad', 'Horas_maxima' => 8, 'horas_mes'=>240]);

    }
}
