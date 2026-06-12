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
        Schema::create('materiaux', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description')->nullable();

            $table->enum('categorie', [
                'liants',
                'metaux',
                'agregats',
                'maconnerie',
                'finition',
                'autres'
            ]);

            $table->enum('unite',['kg','sac', 'm³', 'tige', 'litre', 'piece', 'tonne', 'm²', 'ml', 'camion', 'autre']);

            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materiaux');
    }
};
