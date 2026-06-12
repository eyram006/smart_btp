<?php

namespace App\Http\Controllers\Api\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        $request->validate([
            'nom_complet' => 'required|string|max:500|unique:users,nom_complet',
            'telephone' => 'nullable|string|regex:/^\+?228\d{8}$/',
            'email' => 'required|string|email|max:255|unique:users,email',
            'date_naissance' => 'required|date',
            'role' => 'required|in:admin,owner,manager,stockkeeper,storekeeper',
            'password' => 'required|string|min:6',
        ]);

        $role = $request->input('role');
        // Create a new user
        $user = User::create([
            'nom_complet' => $request->nom_complet,
            'telephone' => $request->telephone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $role,
            'date_naissance' => $request->date_naissance,
        ]);

    // Return the created user as a response
    return response()->json($user, 201);
}
}
