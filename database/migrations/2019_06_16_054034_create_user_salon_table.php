<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserSalonTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_salon', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('salon_id')->unsigned();
            $table->primary(['user_id', 'salon_id']);


            $table->foreign('user_id')
                ->references('id')
                ->on('users');
            $table->foreign('salon_id')
                ->references('id')
                ->on('salons');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_salon');
    }
}
