<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ChantierSeeder;
use Database\Seeders\MateriauSeeder;
use App\Models\Domain\materiaux\materiau;
use App\Models\Domain\stocks\Stock;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'nom_complet' => 'Test User',
            'telephone' => '+22890000000',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'role' => 'manager',
            'date_naissance' => '2000-01-01',
        ]);

        User::factory()->create([
            'nom_complet' => 'Admin User',
            'telephone' => '+22890000001',
            'email' => 'admin@example.com',
            'password' => bcrypt('123456'),
            'role' => 'storekeeper',
            'date_naissance' => '2000-01-01',
        ]);

        User::factory()->create([
            'nom_complet' => 'NOV Laeti',
            'telephone' => '+22890000001',
            'email' => 'laeti@gmail.com',
            'password' => bcrypt('200634'),
            'role' => 'owner',
            'date_naissance' => '2000-01-01',
        ]);

        $this->call([ChantierSeeder::class,]);
        Materiau::factory(10)->create();
        $this->call([MateriauSeeder::class,]);
        $this->call([StockSeeder::class,]);
    }
}
