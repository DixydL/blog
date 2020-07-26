<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndex extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('likesables', function (Blueprint $table) {
            $table->index('likesable_id');
        });

        Schema::table('tagables', function (Blueprint $table) {
            $table->index('tagable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('likesables', function (Blueprint $table) {
            $table->dropIndex(['likesable_id']);
        });

        Schema::table('tagables', function (Blueprint $table) {
            $table->dropIndex(['tagable_id']);
        });
    }
}
