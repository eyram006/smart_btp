<?php

namespace Database\Factories;

use App\Models\Domain\chantiers\Chantier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Chantier>
 */
class ChantierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name' => fake()->company(),

        'location' => fake()->city() . ', ' . fake()->country(),

        'surface' => fake()->numberBetween(50, 5000),

        'start_date' => fake()->date(),

        'status' => fake()->boolean(70)
    ? 'active'
    : fake()->randomElement([
        'planning',
        'paused',
        'done',
    ]),

        ];
    }
}
