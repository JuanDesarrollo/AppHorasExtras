<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'employee_id' => '106',
            'user' => 'Admin',
            'password' => Hash::make('1234')
        ])->assignRole('Admin');

        //CREADORES

        /*  User::create([
            'employee_id' => '42',
            'user' => 'creador_tic',
            'password' => Hash::make('123')
        ])->assignRole('Creador');

        User::create([
            'employee_id' => '3',
            'user' => 'creador_comercial',
            'password' => Hash::make('123')
        ])->assignRole('Creador');

        User::create([
            'employee_id' => '4',
            'user' => 'creador_controlInterno',
            'password' => Hash::make('123')
        ])->assignRole('Creador');

        //JEFES
        User::create([
            'employee_id' => '152',
            'user' => 'jefe_tic',
            'password' => Hash::make('123')
        ])->assignRole('Jefe');

        User::create([
            'employee_id' => '6',
            'user' => 'jefe_comercial',
            'password' => Hash::make('123')
        ])->assignRole('Jefe');

        User::create([
            'employee_id' => '45',
            'user' => 'nomina',
            'password' => Hash::make('123')
        ])->assignRole('Nomina');

        User::create([
            'employee_id' => '8',
            'user' => 'Control_Interno',
            'password' => Hash::make('123')
        ])->assignRole('controlInterno');

        User::create([
            'employee_id' => '17',
            'user' => 'Monitoreo_Seg',
            'password' => Hash::make('123')
        ])->assignRole('Monitoreo_seg');
*/
    }

    // php artisan db:seed --class UserSeeder 
}
