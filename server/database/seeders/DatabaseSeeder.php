<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'firstname' => "Super",
            'lastname' => "Admin",
            'email' => "super-admin@gmail.com",
            'password' => Hash::make('lio messi')
        ]);
        Role::factory()->count(3)->create();
    }
}
