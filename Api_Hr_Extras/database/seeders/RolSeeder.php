<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $role1 =  Role::create(["name" => "admin"]);
    $role2 =  Role::create(["name" => "creador"]);
    $role3 =  Role::create(["name" => "jefe"]);
    $role4 =  Role::create(["name" => "nomina"]);
    $role5 =  Role::create(["name" => "controlInterno"]);
    $role6 =  Role::create(["name" => "Monitoreo_seg"]);

    Permission::create(['name' => 'Administrador'])->syncRoles([$role1]);
    Permission::create(['name' => 'CrearHr'])->syncRoles([$role2, $role1]);
    Permission::create(['name' => 'CrearProgramacion'])->syncRoles([$role2, $role1]);

    Permission::create(['name' => 'AprobarHr'])->syncRoles([$role3, $role1]);
    Permission::create(['name' => 'VerInformeHr'])->syncRoles([$role2, $role1, $role3]);
    Permission::create(['name' => 'InformeProgramaciones'])->syncRoles([$role2, $role1, $role3, $role6]);
    //Permission::create(['name' => 'AprobarProgramcion'])->syncRoles([$role3, $role1]);
    Permission::create(['name' => 'NominaControl'])->syncRoles([$role4, $role5, $role1]);
    Permission::create(['name' => 'CrearCortes'])->syncRoles([$role4, $role5, $role1]);
    Permission::create(['name' => 'PorcentajeExtras'])->syncRoles([$role4, $role5, $role1]);
  }

  // php artisan db:seed --class RolSeeder 
}
