<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Domain\stocks\Stock;
use App\Models\Domain\chantiers\Chantier;
use App\Models\Domain\materiaux\materiau;
class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    foreach (Chantier::all() as $chantier) {
    Materiau::inRandomOrder()->limit(10)->get()->each(function ($materiau) use ($chantier) {

        Stock::firstOrCreate(
            [
                'chantier_id' => $chantier->id,
                'materiau_id' => $materiau->id,
            ],
            [
                'quantite' => fake()->randomFloat(2, 1, 1000),
                'seuil_alerte' => fake()->randomFloat(2, 1, 500),
            ]
        );

    });
}
}
}
