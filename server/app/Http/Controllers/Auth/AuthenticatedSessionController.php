<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LoginRequest $request)
    {
        // Récupération de l'adresse e-mail et du mode de la requête
        $email = $request->email;
        $mode = $request->mode;

        // Recherche de l'utilisateur en fonction de l'adresse e-mail
        $user = User::where('email', $email)->first();

        // Vérification du mode (admin ou utilisateur)
        if ($mode == "admin") {
            // Vérification du rôle de l'utilisateur
            if ($user->role_id !== 2) {
                return response()->json("Désolé, vous n'êtes pas un administrateur", 427);
            }
        }

        // Vérification de l'adresse e-mail vérifiée
        if (!$user->hasVerifiedEmail()) {
            return response()->json("Votre adresse e-mail n'est pas vérifiée", 409);
        }

        // Vérification du compte vérifié
        if (!$user->isVerified()) {
            return response()->json("Votre compte n'est pas vérifié", 426);
        }

        // Authentification de la requête
        $request->authenticate();

        // Régénération de la session
        $request->session()->regenerate();

        // Réponse JSON vide indiquant que la connexion a réussi
        return response()->json();
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
