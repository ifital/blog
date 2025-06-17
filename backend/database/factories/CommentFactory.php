<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'post_id' => Post::inRandomOrder()->first()?->id ?? Post::factory(),
            'author' => $this->faker->name(),
            'content' => $this->faker->sentence(10),
        ];
    }
}
