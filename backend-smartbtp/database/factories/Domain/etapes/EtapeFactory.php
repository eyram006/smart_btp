<?php

namespace Database\Factories\Domain\etapes;

use App\Models\Domain\etapes\Etape;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Domain\chantiers\Chantier;

/**
 * @extends Factory<Etape>
 */
class EtapeFactory extends Factory
{

protected $model = Etape::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => fake()->sentence(3),
            'type' => fake()->randomElement([
                'gros_oeuvre',
                'second_oeuvre',
                'finition',
                'controle',
            ]),
            'date_debut' => fake()->dateTimeBetween('-1 month', '+1 month'),
            'date_fin' => fake()->dateTimeBetween('+1 month', '+3 months'),
            'statut' => fake()->randomElement([
                'a_venir',
                'en_cours',
                'terminee',
            ]),
            'chantier_id' => Chantier::inRandomOrder()->first()?->id ?? Chantier::factory(),

        ];
    }
}
