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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('materiau_id')
                  ->constrained('materiaux')
                  ->cascadeOnDelete();

            $table->foreignId('chantier_id')
                  ->constrained('chantiers')
                  ->cascadeOnDelete();

$table->unique(['chantier_id', 'materiau_id']);

            $table->decimal('quantite', 10, 2);
            $table->decimal('seuil_alerte', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
