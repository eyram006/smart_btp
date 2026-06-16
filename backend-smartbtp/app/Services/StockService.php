<?php
namespace App\Services;

use App\Models\Domain\stocks\Stock;
use App\Models\Domain\mouvements\Mouvement;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class StockService
{
    public function effectuerMouvement(array $data): Mouvement
    {
        return DB::transaction(function () use ($data) {

            $stock = Stock::findOrCreateStock(
                $data['chantier_id'],
                $data['materiau_id']
            );

            if ($data['type'] === 'sortie') {

                if ($stock->quantite < $data['quantite']) {
                    throw ValidationException::withMessages([
                        'quantite' => 'Stock insuffisant'
                    ]);
                }

                $stock->decrement(
                    'quantite',
                    $data['quantite']
                );
            }

            if ($data['type'] === 'entree') {

                $stock->increment(
                    'quantite',
                    $data['quantite']
                );
            }

            return Mouvement::create($data);
        });
    }
}