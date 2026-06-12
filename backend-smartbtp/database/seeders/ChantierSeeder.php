<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Domain\chantiers\Chantier;

class ChantierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          Chantier::create([
            'user_id' => 13,
            'name' => 'Residence Horizon',
            'location' => 'Lome, Togo',
            'surface' => 250,
            'start_date' => '2026-01-15',
            'status' => 'active',
        ]);

        Chantier::create([
            'user_id' => 12,
            'name' => 'Immeuble Kara Centre',
            'location' => 'Kara, Togo',
            'surface' => 1200,
            'start_date' => '2026-02-01',
            'status' => 'planning',
        ]);
    }
}
