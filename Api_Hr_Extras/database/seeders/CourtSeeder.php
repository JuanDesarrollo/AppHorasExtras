<?php

namespace Database\Seeders;

use App\Models\court;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //se debe de crear una columna de año
        court::create(["name" => "PRIMERA ENERO - 2023", "date_i" => "2023-12-23", "date_f" => "2024-01-06", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "SEGUNDA DE ENERO", "date_i" => "2024-01-07", "date_f" => "2024-01-21", "status" => "abierto", "usuario_finalizador" => 0]);

        court::create(["name" => "PRIMERA DE FEBRERO", "date_i" => "2024-01-22", "date_f" => "2024-02-05", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "SEGUNDA DE FEBRERO", "date_i" => "2024-02-06", "date_f" => "2024-02-20", "status" => "abierto", "usuario_finalizador" => 0]);

        court::create(["name" => "PRIMERA DE MARZO", "date_i" => "2024-02-21", "date_f" => "2024-03-06", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "SEGUNDA DE MARZO", "date_i" => "2024-03-07", "date_f" => "2024-03-20", "status" => "abierto", "usuario_finalizador" => 0]);

        court::create(["name" => "PRIMERA DE ABRIL", "date_i" => "2024-03-21", "date_f" => "2024-04-08", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "SEGUNDA DE ABRIL", "date_i" => "2024-04-09", "date_f" => "2024-04-23", "status" => "abierto", "usuario_finalizador" => 0]);

        court::create(["name" => "SEGUNDA DE MAYO", "date_i" => "2024-05-09", "date_f" => "2024-05-23", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "PRIMERA DE MAYO", "date_i" => "2024-04-24", "date_f" => "2024-05-08", "status" => "abierto", "usuario_finalizador" => 0]);

        court::create(["name" => "PRIMERA DE JUNIO", "date_i" => "2024-05-24", "date_f" => "2024-06-08", "status" => "abierto", "usuario_finalizador" => 0]);
        court::create(["name" => "SEGUNDA DE JUNIO", "date_i" => "2024-06-09", "date_f" => "2024-06-23", "status" => "abierto", "usuario_finalizador" => 0]);
    }
    // php artisan db:seed --class CourtSeeder 
    //select 'court::create(["name" => "' ||NOMBRE_CORTE||'", "date_i" => "'||to_Char(FECHA_INICIO, 'yyyy-mm-dd')||'", "date_f" => "'||to_Char(FECHA_FINAL, 'yyyy-mm-dd')||'", "status" => "abierto", "usuario_finalizador" =>0]);' from comi_cortes;
}
