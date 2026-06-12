<?php

namespace App\Models\Domain\materiaux;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Domain\stocks\Stock;
class materiau extends Model
{
        use HasFactory;
protected $table = 'materiaux';
    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'description',
        'categorie',
        'unite',
        'image',
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

    // public function categorie()
    // {
    //     return $this->belongsTo(CategorieMateriau::class, 'categorie_id');
    // }



    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
