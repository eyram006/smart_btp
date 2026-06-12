<?php

namespace App\Http\Controllers\Api\stocks;

use App\Http\Controllers\Controller;
use App\Models\Domain\stocks\Stock;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Domain\chantiers\Chantier;
class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $stocks = Stock::all();

        return response()->json($stocks);
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
    public function store(Request $request, Chantier $chantier): JsonResponse
    {
        $data = $request->validate([
            'materiau_id' => ['required', 'integer', 'exists:materiau,id'],
            'chantier_id' => ['required', 'integer', 'exists:chantiers,id'],
            'quantite' => ['required', 'numeric'],
            'seuil_alerte' => ['required', 'numeric'],
        ]);

        $stock = Stock::create($data);

        return response()->json($stock, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock): JsonResponse
    {
        return response()->json($stock);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock): JsonResponse
    {
        $data = $request->validate([
            'materiau_id' => ['sometimes', 'required', 'integer', 'exists:materiau,id'],
            'chantier_id' => ['sometimes', 'required', 'integer', 'exists:chantiers,id'],
            'quantite' => ['sometimes', 'required', 'numeric'],
            'seuil_alerte' => ['sometimes', 'required', 'numeric'],
        ]);

        $stock->update($data);

        return response()->json($stock);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock): JsonResponse
    {
        $stock->delete();

        return response()->json(null, 204);
    }
}

