-- CreateTable
CREATE TABLE `book` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NULL,
    `author` VARCHAR(45) NULL,
    `description` TEXT NULL,
    `copies` INTEGER NULL,
    `copies_available` INTEGER NULL,
    `category` VARCHAR(11) NULL,
    `img` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checkout` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NULL,
    `checkout_date` VARCHAR(45) NULL,
    `return_date` VARCHAR(45) NULL,
    `book_id` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NULL,
    `checkout_date` VARCHAR(45) NULL,
    `returned_date` VARCHAR(45) NULL,
    `title` VARCHAR(45) NULL,
    `author` VARCHAR(45) NULL,
    `description` TEXT NULL,
    `img` MEDIUMBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NULL,
    `title` VARCHAR(45) NULL,
    `question` TEXT NULL,
    `admin_email` VARCHAR(45) NULL,
    `response` TEXT NULL,
    `closed` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(45) NULL,
    `date` DATETIME(6) NULL,
    `rating` DECIMAL(3, 2) NULL,
    `book_id` BIGINT NULL,
    `review_description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
