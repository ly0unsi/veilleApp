<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\EmailVerification;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function store($id)
    {
        $user = User::find($id);

        if ($user) {
            $recipientEmail = $user->email;
            $url = env('FRONTEND_URL') . "/verify-email/" . $user->id;
            Mail::to($recipientEmail)->send(new EmailVerification($user->firstname, $url));
        }

        return response()->json(['status' => 'verification-link-sent']);
    }
}
