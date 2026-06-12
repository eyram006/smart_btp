<?php

namespace Database\Factories\Domain\stocks;

use App\Models\Domain\stocks\Stock;
use Illuminate\Database\Eloquent\Factories\Factory;
use    App\Models\Domain\chantiers\Chantier;
use    App\Models\Domain\materiaux\Materiau;

/**
 * @extends Factory<Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        // $materiau = Materiau::inRandomOrder()->first();
        // $chantier = Chantier::inRandomOrder()->first();

        return [
            // 'chantier_id' => $chantier?->id,
            // 'materiau_id' => $materiau?->id,
            'quantite' => fake()->randomFloat(2, 1, 1000),
            'seuil_alerte' => fake()->randomFloat(2, 1, 500),
        ];
    }
}
