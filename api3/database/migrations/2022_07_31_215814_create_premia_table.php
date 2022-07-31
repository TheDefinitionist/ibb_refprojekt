<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::disableForeignKeyConstraints(); 

        //DB::statement('DROP TABLE IF EXISTS `premia`;');
        
        DB::statement('
            CREATE TABLE IF NOT EXISTS `premia` (
                `id` INT PRIMARY KEY AUTO_INCREMENT,
                `status` TINYINT(1) DEFAULT 0,
                `expiration_date` DATETIME,
                `subscription_date` DATETIME NULL,
                `description` TEXT NOT NULL,
                

            ) ENGINE = InnoDB;
        ');

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('premia');
    }
};
