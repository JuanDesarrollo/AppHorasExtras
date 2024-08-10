<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('areas')->insert([
            'name' => 'SISTEMAS',
            'Company_code' => 1
        ]);
        DB::table('areas')->insert([
            'name' => 'DEPARTAMENTO DE SEGURIDAD',
            'Company_code' => 2
        ]);
        DB::table('areas')->insert([
            'name' => 'DEPARTAMENTO COMERCIAL',
            'Company_code' => 3
        ]);
        DB::table('areas')->insert([
            'name' => 'RECURSO HUMANO',
            'Company_code' => 4
        ]);
        DB::table('areas')->insert([
            'name' => 'GERENCIA',
            'Company_code' => 5
        ]);
        DB::table('areas')->insert([
            'name' => 'TESORERIA',
            'Company_code' => 7
        ]);
        DB::table('areas')->insert([
            'name' => 'LOGISTICA',
            'Company_code' => 8
        ]);
        DB::table('areas')->insert([
            'name' => 'DEPARTAMENTO ADMINISTRATIVO',
            'Company_code' => 15
        ]);
        DB::table('areas')->insert([
            'name' => 'DEPARTAMENTO FINANCIERA',
            'Company_code' => 16
        ]);
        DB::table('areas')->insert([
            'name' => 'AUDITORIA INTERNA',
            'Company_code' => 17
        ]);
    }
       // php artisan db:seed --class AreaSeeder 

}
