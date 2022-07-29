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
        DB::statement('
            CREATE TABLE IF NOT EXISTS `mbdb`.`user` (
                `id` INT NOT NULL AUTO_INCREMENT,
                `username` VARCHAR(45) NOT NULL,
                `password` VARCHAR(63) NOT NULL,
                `email` VARCHAR(127) NOT NULL,
                `registration_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                `is_verified` TINYINT NULL DEFAULT 0,
                `token` VARCHAR(63) NULL,
                `token_expiration` DATETIME NULL,
                `premium_id` INT NOT NULL,
                PRIMARY KEY (`id`, `premium_id`),
                UNIQUE INDEX `user_UNIQUE` (`username` ASC) VISIBLE,
                UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
                UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
                INDEX `fk_user_premium1_idx` (`premium_id` ASC) VISIBLE,
                CONSTRAINT `fk_user_premium1`
                  FOREIGN KEY (`premium_id`)
                  REFERENCES `mbdb`.`premium` (`id`)
                  ON DELETE NO ACTION
                  ON UPDATE NO ACTION
            ) ENGINE = InnoDB;
          ');

        /*Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
