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
        $email = $request->email;
        $mode = $request->mode;
        $user = User::where('email', $email)->first();
        if ($mode == "admin") {
            if ($user->role_id !== 2) return response()->json("Desole vous n'etes pas un admin", 427);
        }
        if (!$user->hasVerifiedEmail()) {
            return response()->json("Votre email n'est pas verifié", 409);
        }
        if (!$user->isVerified()) {
            return response()->json("Votre compte n'est pas verifié", 426);
        }

        $request->authenticate();

        $request->session()->regenerate();


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
