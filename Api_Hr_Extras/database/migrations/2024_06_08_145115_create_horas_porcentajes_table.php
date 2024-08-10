<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('horas_porcentajes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('conceptos');
            $table->float('porcentaje');
            $table->integer('company_code');
            $table->integer('company_code_seguridad');
            $table->integer('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horas_porcentajes');
    }
};
