<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mouvements', function (Blueprint $table) {
            $table->id();

            $table->enum('type', ['entree', 'sortie']);
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('materiau_id');
            $table->unsignedBigInteger('etape_id');
            $table->decimal('quantite', 10);
            $table->foreign('materiau_id')->references('id')->on('materiaux')->onDelete('cascade');
            $table->foreign('etape_id')->references('id')->on('etapes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mouvements');
    }
};
