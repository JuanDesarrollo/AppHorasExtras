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
        Schema::create('jornada_maximas', function (Blueprint $table) {
            $table->id();
            $table->string('Tipo_jornada');
            $table->float('Horas_maxima');
            $table->float('horas_mes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jornada_maximas');
    }
};
