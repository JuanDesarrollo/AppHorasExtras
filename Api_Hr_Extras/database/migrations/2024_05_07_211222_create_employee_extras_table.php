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
        Schema::create('employee_extras', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('employee_id');
            $table->unsignedBigInteger('court_id');
            $table->string('status');
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('court_id')->references('id')->on('courts')->onDelete('cascade');
            $table->unique(['court_id', 'employee_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_extras');
    }
};
