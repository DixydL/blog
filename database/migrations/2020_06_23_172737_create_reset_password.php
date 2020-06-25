<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResetPassword extends Migration
{
    public function up()
    {
        Schema::create('password_reset', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email')->index();
            $table->integer('secret');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('password_reset');
    }
}
