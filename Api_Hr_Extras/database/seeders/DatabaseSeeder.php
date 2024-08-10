<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\HorasPorcentajes;
use Illuminate\Database\Seeder;
use Database\Seeders\EmployeeSeeder;


class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {

    $this->call([
      AreaSeeder::class,
      CourtSeeder::class,
      EmployeeSeeder::class,
      RolSeeder::class,
      UserSeeder::class,
      HorasPorcentajesSeeder::class,
      JornadaMaxima::class,
    ]);
  }
}
//    // php artisan db:seed --class DatabaseSeeder 
