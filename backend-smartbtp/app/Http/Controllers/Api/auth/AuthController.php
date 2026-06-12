<?php

namespace App\Http\Controllers\Api\auth;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'login'    => 'required_without:email|string',
            'email'    => 'required_without:login|email',
            'password' => 'required|string',
        ]);

        $login = $request->input('login') ?? $request->input('email');

        $user = User::where('email', $login)
            ->orWhere('nom_complet', $login)
            ->first();

        if ($user && Hash::check($request->password, $user->password)) {

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
    'token' => $token,
    'access_token' => $token,
    'token_type'   => 'Bearer',
    'user'         => $user,
]);
    }

    // 4. SINON : L'utilisateur n'existe pas ou le mot de passe est faux
    return response()->json(['message' => 'Invalid credentials'], 401);
}

public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }


public function me(Request $request)
{
    return response()->json($request->user());
}
}
