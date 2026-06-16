<?php

namespace Database\Factories\Domain\materiaux;

use App\Enums\CategorieMateriau;
use App\Enums\MateriauUnite;
use App\Models\Domain\materiaux\Materiau;
use Illuminate\Database\Eloquent\Factories\Factory;
use Symfony\Component\Uid\NilUlid;

/**
 * @extends Factory<Materiau>
 */
class MateriauFactory extends Factory
{
    protected $model = Materiau::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
    return [
    'nom' => fake()->words(2, true),
    'description' => fake()->optional()->sentence(),
    'categorie' => fake()->randomElement(CategorieMateriau::cases())->value,
    'unite' => fake()->randomElement(MateriauUnite::cases())->value,
    'image' => fake()->optional()->imageUrl(640, 480),
    ];
    }

}
