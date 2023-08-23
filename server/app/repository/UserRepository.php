<?php

namespace App\repository;

use App\Models\User;
use App\Models\YourModel;

class UserRepository
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function getDemandes()
    {
        User::whereNull('verified_at')->get();
    }
}
