<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;
    public $username, $url;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($username, $url)
    {
        $this->username = $username;
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('email.email_verification')
            ->subject("Verification d'email")
            ->with([
                'name' => 'IHM', // Data you want to pass to the email view
            ]);
    }
}
