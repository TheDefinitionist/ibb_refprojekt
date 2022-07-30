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
        
        DB::statement('DROP TABLE IF EXISTS `accounts`;');
        
        DB::statement('
            CREATE TABLE `accounts` (
                `id` INT PRIMARY KEY AUTO_INCREMENT,
                `username` VARCHAR(45) NOT NULL UNIQUE,
                `password` VARCHAR(63) NOT NULL,
                `email` VARCHAR(127) NOT NULL UNIQUE,
                `registration_date` DATETIME DEFAULT CURRENT_TIMESTAMP(),
                `is_verified` TINYINT(1) DEFAULT 0,
                `token` VARCHAR(63),
                `token_expiration` DATETIME,
                `premium_id` INT NOT NULL,

                INDEX `fk_user_premium_idx` (`premium_id`),
                CONSTRAINT `fk_user_premium`
                    FOREIGN KEY (`premium_id`)
                    REFERENCES `premium` (`id`)
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
        Schema::dropIfExists('accounts');
    }
};
