<?php

namespace App\Models\Domain\chantiers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use Database\Factories\ChantierFactory;
use App\Models\Domain\stocks\Stock;


class Chantier extends Model
{
    use HasFactory;
     protected static function newFactory()
    {
        return ChantierFactory::new();
    }
protected $table = 'chantiers';


    protected $fillable = [
        'name',
        'location',
        'surface',
        'start_date',
        'status',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
        'start_date' => 'date',
        'surface' => 'decimal:2',
        ];
    }

public function user()
{
    return $this->belongsTo(User::class);
}

public function stocks()
{
    return $this->has(Stock::class);
}

// public function etapes()
// {
//     return $this->hasMany(Etape::class);
// }

// public function mouvements()
// {
//     return $this->hasMany(Mouvement::class);
// }

// public function recommandations()
// {
//     return $this->hasMany(Recommandation::class);
// }
}
