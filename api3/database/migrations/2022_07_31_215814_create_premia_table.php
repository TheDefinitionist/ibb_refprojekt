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
            CREATE TABLE `premia` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `status` TINYINT NULL DEFAULT 0,
                `expiration_date` DATETIME NULL,
                `subscription_date` DATETIME NULL,
                `description` TEXT NOT NULL,
                `user_id` INT NOT NULL,
                PRIMARY KEY (`id`, `user_id`),
                INDEX `id_UNIQUE` (`id` ASC) VISIBLE,

                INDEX `fk_premium_user1_idx` (`user_id` ASC),
                CONSTRAINT `fk_premium_user1`
                    FOREIGN KEY (`user_id`)
                    REFERENCES `musicboardDB`.`accounts` (`id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
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
