<?php

namespace App\Models\Domain\stocks;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Domain\chantiers\Chantier;
use App\Models\Domain\materiaux\Materiau;

class Stock extends Model
{

    use HasFactory;
    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chantier_id',
        'materiau_id',
        'quantite',
        'seuil_alerte',
    ];

    /**
     * Les types à convertir automatiquement.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'quantite' => 'decimal:2',
        'seuil_alerte' => 'decimal:2',
    ];


    protected $appends = [
        'statut',
        'pourcentage_stock'
    ];

    public function getStatutAttribute()
    {
        if ($this->quantite <= 0) {
            return 0;
        }
        if ($this->seuil_alerte <= 0) {
            return 100;
        }
        return round(min(($this->quantite / max($this->seuil_alerte, 1)) * 100, 100));
    }

    public function getPourcentageStockAttribute()
    {
        if ($this->seuil_alerte <= 0) {
            return 100;
        }
        return min(
            round(($this->quantite / $this->seuil_alerte) * 100),
            100
        );
    }

    public static function findOrCreateStock(int $chantierId, int $materiauId)
    {
        return self::firstOrCreate([
            'chantier_id' => $chantierId,
            'materiau_id' => $materiauId,
        ], [
            'quantite' => 0,
            'seuil_alerte' => 1,
        ]);
    }


    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    public function materiau()
    {
        return $this->belongsTo(Materiau::class);
    }
}
