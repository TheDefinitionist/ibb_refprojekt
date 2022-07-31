-- MySQL Script generated by MySQL Workbench
-- Mon Aug  1 00:35:53 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema musicboardDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema musicboardDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `musicboardDB` DEFAULT CHARACTER SET utf8 ;
USE `musicboardDB` ;

-- -----------------------------------------------------
-- Table `musicboardDB`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`accounts` (
  `id` INT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(63) NOT NULL,
  `email` VARCHAR(127) NOT NULL,
  `registration_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP(),
  `is_verified` TINYINT NULL DEFAULT 0,
  `token` VARCHAR(63) NULL,
  `token_expiration` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicboardDB`.`column`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`column` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicboardDB`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `content` TEXT NOT NULL,
  `image` TEXT NULL DEFAULT 'default.png',
  `date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `is_premium` TINYINT NULL DEFAULT 0,
  `column_id` INT NOT NULL,
  PRIMARY KEY (`id`, `column_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_article_column1_idx` (`column_id` ASC) VISIBLE,
  CONSTRAINT `fk_article_column1`
    FOREIGN KEY (`column_id`)
    REFERENCES `musicboardDB`.`column` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicboardDB`.`artist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`artist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicboardDB`.`song`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`song` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `rank` VARCHAR(45) NOT NULL,
  `cover` TEXT NULL DEFAULT 'default_song.png',
  `debut` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `artist_id` INT NOT NULL,
  PRIMARY KEY (`id`, `artist_id`),
  UNIQUE INDEX `rank_UNIQUE` (`rank` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_song_artist1_idx` (`artist_id` ASC) VISIBLE,
  CONSTRAINT `fk_song_artist1`
    FOREIGN KEY (`artist_id`)
    REFERENCES `musicboardDB`.`artist` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `musicboardDB`.`premia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `musicboardDB`.`premia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT NULL DEFAULT 0,
  `expiration_date` DATETIME NULL,
  `subscription_date` DATETIME NULL,
  `description` TEXT NOT NULL,
  `accounts_id` INT NOT NULL,
  PRIMARY KEY (`id`, `accounts_id`),
  INDEX `fk_premia_accounts_idx` (`accounts_id` ASC) INVISIBLE,
  CONSTRAINT `fk_premia_accounts`
    FOREIGN KEY (`accounts_id`)
    REFERENCES `musicboardDB`.`accounts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
