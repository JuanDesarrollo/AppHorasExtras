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
        Schema::create('extra_hours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('employee_extra_id');
            $table->date('date_i');
            $table->date('date_f');
            $table->time('time_i');
            $table->time('time_f');
            $table->string('status');
            $table->foreign('employee_extra_id')->references('id')->on('employee_extras')->onDelete('cascade');
               });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extra_hours');
    }
};
