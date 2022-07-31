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
        
        //DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        //DB::statement('DROP TABLE IF EXISTS `premia`;');
        
        DB::statement('
            CREATE TABLE `premia` (
                `id` INT AUTO_INCREMENT,
                `status` TINYINT DEFAULT 0,
                `expiration_date` DATETIME,
                `subscription_date` DATETIME ,
                `description` TEXT NOT NULL,
                `accounts_id` INT NOT NULL,
                
                PRIMARY KEY (`id`, `accounts_id`),
                INDEX `fk_premia_accounts_idx` (`accounts_id`),
                CONSTRAINT `fk_premia_accounts`
                    FOREIGN KEY (`accounts_id`)
                    REFERENCES `accounts` (`id`)
                    ON DELETE CASCADE
            ) ENGINE=InnoDB;
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
