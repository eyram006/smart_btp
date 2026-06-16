<?php

namespace App\Models\Domain\mouvements;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mouvement extends Model
{
    /** @use HasFactory<\Database\Factories\MouvementFactory> */
    use HasFactory;
    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'type',
        'notes',
        'materiau_id',
        'etape_id',
        'quantite',
    ];

    /**
     * Les types à convertir automatiquement.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            // Ajoutez vos conversions ici
        ];
    }
}
