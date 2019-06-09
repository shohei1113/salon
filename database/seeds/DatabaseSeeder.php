<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        $this->call(CategoryTableSeeder::class);

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        Model::reguard();
    }
}
