<?php

namespace App\Http\Controllers\Api\etapes;

use App\Http\Controllers\Controller;
use App\Models\Domain\etapes\Etape;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Domain\chantiers\Chantier;

class EtapeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
  $etapes = Etape::where('chantier_id', $request->chantier_id)
        ->latest()
        ->get();

    return response()->json([
        'data' => $etapes
    ]);    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request): JsonResponse
    // {
    //     $data = $request->validate([
    //         'nom' => ['required', 'string', 'max:255'],
    //         'type' => ['required', 'in:gros_oeuvre,second_oeuvre,finition,controle'],
    //         'date_debut' => ['required', 'date'],
    //         'date_fin' => ['required', 'date', 'after_or_equal:date_debut'],
    //         'statut' => ['required', 'in:a_venir,en_cours,terminee'],
    //         'chantier_id' => ['required', 'integer', 'exists:chantiers,id'],
    //     ]);

    //     $etape = Etape::create($data);
    //     return response()->json($etape, 201);
    // }

    /**
     * Display the specified resource.
     */
    public function show(Etape $etape): JsonResponse
    {
        return response()->json($etape);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etape $etape): JsonResponse
    {
        $data = $request->validate([
            'nom' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'in:gros_oeuvre,second_oeuvre,finition,controle'],
            'date_debut' => ['sometimes', 'date'],
            'date_fin' => ['sometimes', 'date', 'after_or_equal:date_debut'],
            'statut' => ['sometimes', 'in:a_venir,en_cours,terminee'],
            'chantier_id' => ['sometimes', 'integer', 'exists:chantiers,id'],
        ]);

        $etape->update($data);

        return response()->json($etape);
    }

    /**
     * Remove the specified resource from storage.
     */

public function getEtapesByChantierId(Chantier $chantier): JsonResponse
{
    $etapes = Etape::where('chantier_id', $chantier->id)
        ->orderBy('date_debut')
        ->get();

    return response()->json($etapes);
}

/**
 * Store a newly created resource in storage.
 */
public function store(Request $request, Chantier $chantier): JsonResponse
{
    $data = $request->validate([
        'nom' => ['required', 'string', 'max:255'],
        'type' => ['required', 'in:gros_oeuvre,second_oeuvre,finition,controle'],
        'date_debut' => ['required', 'date'],
        'date_fin' => ['required', 'date', 'after_or_equal:date_debut'],
        'statut' => ['required', 'in:a_venir,en_cours,terminee'],
    ]);

    $etape = Etape::create([
        'nom' => $data['nom'],
        'type' => $data['type'],
        'date_debut' => $data['date_debut'],
        'date_fin' => $data['date_fin'],
        'statut' => $data['statut'],
        'chantier_id' => $chantier->id,
    ]);
    return response()->json($etape, 201);
}
    public function destroy(Etape $etape): JsonResponse
    {
        $etape->delete();

        return response()->json(null, 204);
    }
}
