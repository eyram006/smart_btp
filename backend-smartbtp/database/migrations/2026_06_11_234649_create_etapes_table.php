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
        Schema::create('etapes', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('type', ['gros_oeuvre', 'second_oeuvre', 'finition', 'controle'])->default('gros_oeuvre');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->enum('statut', ['a_venir', 'en_cours', 'terminee'])->default('en_cours');
            $table->unsignedBigInteger('chantier_id');
            $table->foreign('chantier_id')->references('id')->on('chantiers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etapes');
    }
};
