<?php

namespace App\Http\Controllers;

use App\Mail\ConfirmNotification;
use App\Models\User;
use Illuminate\Http\Response;
use App\repository\UserRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getDemandes()
    {
        // $demandes = $this->userRepository->getDemandes();
        $demandes = User::whereNull('verified_at')->with('role:id,name')->paginate(2);
        return response()->json($demandes);
    }
    public function confirmDemande($id)
    {
        // $demandes = $this->userRepository->getDemandes();

        $user = User::find($id);

        if ($user) {
            $user->update([
                'verified_at' => Carbon::now(),
            ]);
            $recipientEmail = $user->email;

            Mail::to($recipientEmail)->send(new ConfirmNotification($user->firstname));
        }

        return response()->json('', Response::HTTP_OK);
    }
}
