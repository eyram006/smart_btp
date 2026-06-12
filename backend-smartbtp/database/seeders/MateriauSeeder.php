<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Domain\materiaux\Materiau;

class MateriauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Materiau::factory()->create([
            'nom' => 'Ciment',
            'description' => 'Ciment de haute qualité pour la construction.',
            'categorie' => 'liants',
            'unite' => 'sac',
            'image' => null,
        ]);

        Materiau::factory()->create([
            'nom' => 'Béton prêt à l\'emploi',
            'description' => 'Béton de qualité supérieure pour les fondations et les structures.',
            'categorie' => 'maconnerie',
            'unite' => 'kg',
            'image' => null,
        ]);

        Materiau::factory()->create([
            'nom' => 'Acier de construction',
            'description' => 'Barres d\'acier pour le renforcement des structures en béton.',
            'categorie' => 'metaux',
            'unite' => 'tige',
            'image' => null,
        ]);

        Materiau::factory()->create([
            'nom' => 'Gravier concassé',
            'description' => 'Gravier de haute qualité pour les travaux de construction.',
            'categorie' => 'agregats',
            'unite' => 'kg',
            'image' => null,
        ]);

        Materiau::factory()->create([
            'nom' => 'Peinture acrylique',
            'description' => 'Peinture résistante pour les finitions intérieures et extérieures.',
            'categorie' => 'finition',
            'unite' => 'litre',
            'image' => null,
        ]);
    }
}
