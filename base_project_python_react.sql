-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema base_project
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema base_project
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `base_project` DEFAULT CHARACTER SET utf8mb4 ;
USE `base_project` ;

-- -----------------------------------------------------
-- Table `base_project`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `base_project`.`users` (
  `id` VARCHAR(50) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `picture` BLOB NULL DEFAULT NULL,
  `is_verified` TINYINT(4) NOT NULL,
  `is_deleted` TINYINT(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
