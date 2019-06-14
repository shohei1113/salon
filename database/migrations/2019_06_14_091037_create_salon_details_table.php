<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSalonDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salon_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('salon_id')->unsigned();
            $table->text('contents')->nullable();
            $table->text('message')->nullable();
            $table->string('target')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('salon_details');
    }
}
