<?php

namespace App\Http\Controllers\Api\materiaux;

use App\Http\Controllers\Controller;
use App\Models\Domain\materiaux\materiau;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use App\Models\Domain\chantiers\Chantier;
use App\Models\Domain\stocks\Stock;

class MateriauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $materiaux = materiau::all();
        return response()->json($materiaux);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,Chantier $chantier): JsonResponse
        {
        $data = $request->validate([
            'nom' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'categorie' => ['required'],
            'unite' => ['required'],
            'quantite_initiale' => ['required', 'numeric', 'min:0'],
            'seuil_alerte' => ['required', 'numeric', 'min:0'],
        ]);

        $materiau = Materiau::create([
            'nom' => $data['nom'],
            'description' => $data['description'] ?? null,
            'categorie' => $data['categorie'],
            'unite' => $data['unite'],
        ]);

        Stock::updateOrCreate([
            'chantier_id' => $chantier->id,
            'materiau_id' => $materiau->id,
        ], [
            'quantite' => $data['quantite_initiale'],
            'seuil_alerte' => $data['seuil_alerte'],
        ]);

        return response()->json($materiau, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(materiau $materiau): JsonResponse
    {
        $materiau->load('stocks');

        return response()->json($materiau);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(materiau $materiau)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, materiau $materiau): JsonResponse
    {
        $data = $request->validate([
            'nom' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'categorie' => ['sometimes', 'required', Rule::in(['liants', 'metaux', 'agregats', 'maconnerie', 'finition', 'autres'])],
            'unite' => ['sometimes', 'required'],
            'image' => ['nullable', 'string', 'max:255'],
        ]);

        $materiau->update($data);

        return response()->json($materiau);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(materiau $materiau): JsonResponse
    {
        $materiau->delete();

        return response()->json(null, 204);
    }
}

