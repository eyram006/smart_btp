<?php

namespace App\Models\Domain\etapes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etape extends Model
{
    //
    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    use Hasfactory;
    protected $fillable = [
        // Ajoutez vos colonnes ici
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
