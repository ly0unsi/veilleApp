<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'name' => $this->faker->unique()->randomElement(['super-admin', 'admin', 'user']),
            'description' =>  $this->faker->sentence
        ];
    }
}
