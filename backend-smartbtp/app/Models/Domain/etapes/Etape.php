<?php

namespace App\Models\Domain\etapes;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\TypeEtape;
use App\Enums\StatutEtape;

class Etape extends Model
{
    /** @use HasFactory<\Database\Factories\Domain\etapes\EtapeFactory> */
    use HasFactory;
    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'type',
        'date_debut',
        'date_fin',
        'statut',
        'chantier_id',
    ];

    /**
     * Les types à convertir automatiquement.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'type' => TypeEtape::class,
        'statut' => StatutEtape::class,
    ];
}
