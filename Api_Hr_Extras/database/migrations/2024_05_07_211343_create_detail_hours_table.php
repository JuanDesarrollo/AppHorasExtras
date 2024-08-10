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
        Schema::create('detail_hours', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('extra_hour_id');
            $table->float('rn')->nullable();
            $table->float('hed')->nullable();
            $table->float('hen')->nullable();
            $table->float('rdd')->nullable();
            $table->float('rdn')->nullable();
            $table->float('hedd')->nullable();
            $table->float('hedn')->nullable();
            $table->string('justification', 1000);
            $table->foreign('extra_hour_id')->references('id')->on('extra_hours')->onDelete('cascade');

            $table->unique('extra_hour_id');

            $table->float('rn')->default(0)->change();
            $table->float('hed')->default(0)->change();
            $table->float('hen')->default(0)->change();
            $table->float('rdd')->default(0)->change();
            $table->float('rdn')->default(0)->change();
            $table->float('hedd')->default(0)->change();
            $table->float('hedn')->default(0)->change();

            //$table->unique(['extra_hour_id ']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_hours');
    }
};
