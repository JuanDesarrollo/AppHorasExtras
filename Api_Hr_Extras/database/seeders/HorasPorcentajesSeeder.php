<?php

namespace Database\Seeders;

use App\Models\HorasPorcentajes as ModelsHorasPorcentajes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HorasPorcentajesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ModelsHorasPorcentajes::create(['conceptos' => 'RECARGO NOCTURNO', 'porcentaje' => 35, 'user' => '42', 'company_code' => 100, 'company_code_seguridad' => 114]);
        ModelsHorasPorcentajes::create(['conceptos' => 'HORA EXTRA DIURNA', 'porcentaje' => 125, 'user' => '42', 'company_code' => 110, 'company_code_seguridad' => 118]);
        ModelsHorasPorcentajes::create(['conceptos' => 'HORA EXTRA NOCTURNA', 'porcentaje' => 175, 'user' => '42', 'company_code' => 111, 'company_code_seguridad' => 119]);
        ModelsHorasPorcentajes::create(['conceptos' => 'DOMINICAL LABORADO DIURNO', 'porcentaje' => 175, 'user' => '42', 'company_code' => 101, 'company_code_seguridad' => 115]);
        ModelsHorasPorcentajes::create(['conceptos' => 'DOMINICAL LABORADO NOCTURNO', 'porcentaje' => 210, 'user' => '42', 'company_code' => 107, 'company_code_seguridad' => 108]);
        ModelsHorasPorcentajes::create(['conceptos' => 'HORA EXTRA FESTIVA DIURNA', 'porcentaje' => 200, 'user' => '42', 'company_code' => 104, 'company_code_seguridad' => 116]);
        ModelsHorasPorcentajes::create(['conceptos' => 'HORA EXTRA FESTIVA NOCTURNA', 'porcentaje' => 250, 'user' => '42', 'company_code' => 105, 'company_code_seguridad' => 117]);
    }
 //   php artisan db:seed --class HorasPorcentajesSeeder 
}
