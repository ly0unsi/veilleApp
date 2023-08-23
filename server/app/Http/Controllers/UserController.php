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
        // Recherche de l'utilisateur en fonction de l'ID fourni
        $user = User::find($id);

        // Si un utilisateur valide est trouvé
        if ($user) {
            // Met à jour le champ 'verified_at' avec l'heure actuelle
            $user->update([
                'verified_at' => Carbon::now(),
            ]);

            // Extraction de l'adresse e-mail du destinataire
            $recipientEmail = $user->email;

            // Envoie d'une notification par e-mail à l'utilisateur confirmé
            Mail::to($recipientEmail)->send(new ConfirmNotification($user->firstname));
        }

        // Réponse JSON indiquant le succès de la confirmation
        return response()->json('', Response::HTTP_OK);
    }
}
