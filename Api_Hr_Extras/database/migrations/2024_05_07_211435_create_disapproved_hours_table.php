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
        Schema::create('disapproved_hours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('detail_hour_id');
            $table->unsignedBigInteger('user_id');
            $table->string('reason',1000);
            $table->foreign('detail_hour_id')->references('id')->on('detail_hours')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disapproved_hours');
    }
};
