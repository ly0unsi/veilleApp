<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param  \Illuminate\Foundation\Auth\EmailVerificationRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke($id)
    {
        // Recherche de l'utilisateur en fonction de l'ID fourni
        $user = User::find($id);
    
        // Vérifie si l'e-mail de l'utilisateur a déjà été vérifié
        if ($user->hasVerifiedEmail()) {
            return response()->json("L'adresse e-mail est déjà vérifiée", 409);
        }
    
        // Marque l'e-mail de l'utilisateur comme vérifié
        $user->markEmailAsVerified();
    
        // Réponse JSON indiquant que la vérification a réussi
        return response()->json("Vérification réussie");
    }
}