<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\auth\AuthController;
use App\Http\Controllers\Api\auth\RegisterController;
use App\Http\Controllers\Api\users\UserController;
use App\Http\Controllers\Api\chantiers\ChantierController;
use App\Http\Controllers\Api\materiaux\MateriauController;
use App\Http\Controllers\Api\stocks\StockController;


/********** AUTHENTICATION ROUTES **********/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register',[RegisterController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});



Route::middleware('auth:sanctum')->group(function () {

Route::apiResource('user', UserController::class);

Route::apiResource('chantiers', ChantierController::class);

Route::apiResource('materiaux', MateriauController::class);
Route::apiResource('stocks', StockController::class);

Route::post('/chantiers/{chantier}/materiaux',[MateriauController::class, 'store']);

// Route::apiResource('fournisseurs', FournisseurController::class);

    // Route::apiResource('mouvements', MouvementController::class);
});
