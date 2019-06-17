<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('users')->insert([
            [
                'name' => 'shohei1113',
                'email' => 'kanatani1113@gmail.com',
                'password' => Hash::make('secret'),
                'email_verified' => 0,
                'email_verify_token' => sha1(uniqid('kanatani1113@gmail.com' , true)),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'keitaro',
                'email' => 'my.address.d@gmail.com',
                'password' => Hash::make('secret'),
                'email_verified' => 0,
                'email_verify_token' => sha1(uniqid('my.address.d@gmail.com' , true)),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);

    }
}
