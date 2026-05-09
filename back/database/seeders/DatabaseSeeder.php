<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Liste des courses',
            'content' => 'Pain, lait, œufs, fruits',
            'priority' => 'Moyenne',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Rendez-vous médecin',
            'content' => 'Jeudi 15h, clinique centrale',
            'priority' => 'Haute',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Idée projet',
            'content' => 'Ajouter un filtre par priorité dans l’app',
            'priority' => 'Basse',
        ]);
    }
}
