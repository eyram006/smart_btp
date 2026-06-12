<?php

namespace App\Http\Controllers\Api\chantiers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Domain\chantiers\Chantier;
use App\Http\Requests\Api\chantiers\StoreChantierRequest;
use Illuminate\Support\Facades\Auth;

class ChantierController extends Controller
{
public function store(StoreChantierRequest $request)
{
     $data = $request->validated();
    $data['user_id'] = Auth::id();

    // 2. On crée le chantier avec le tableau complet
    $chantier = Chantier::create($data);

    return response()->json( $chantier, 201);
}

public function index(){
    $chantiers = Chantier::where('user_id', Auth::id())->get();
    return response()->json($chantiers);
}

public function show(int $id){
    $chantier = Chantier::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
    return response()->json($chantier);

}
}
