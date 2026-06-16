<?php

namespace App\Http\Controllers\Api\mouvements;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\StockService;
use Illuminate\Validation\Rule;
use App\Models\Domain\chantiers\Chantier;
use App\Models\Domain\materiaux\Materiau;
use App\Models\Domain\mouvements\Mouvement;


class MouvementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $mouvements = Mouvement::where('chantier_id', $request->chantier_id)
        ->latest()
        ->get();

    return response()->json([
        'data' => $mouvements
    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,StockService $stockService)
 {
        $validated = $request->validate([
            'chantier_id' => ['required', Rule::exists(Chantier::class, 'id')],
            'materiau_id' => ['required', Rule::exists(Materiau::class, 'id')],
            'type' => 'required|in:entree,sortie',
            'quantite' => 'required|numeric|min:0.01',
            'etape_id' => 'required|integer',
            'notes' => 'nullable|string',
        ]);
        $mouvement = $stockService->effectuerMouvement( $validated );

        return response()->json([
            'message' => 'Mouvement enregistré',
            'data' => $mouvement ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

