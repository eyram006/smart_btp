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
        Schema::create('chantiers', function (Blueprint $table) {
            $table->id();
    $table->string('name');
    $table->string('location');
    $table->decimal('surface', 10, 2)
          ->nullable();
    $table->date('start_date');

    $table->enum('status', [
        'planning',
        'active',
        'paused',
        'done'
    ])->default('active');

    $table->foreignId('user_id')
      ->references('id')
      ->on('users')
      ->cascadeOnDelete();

    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chantiers');
    }
};
