-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'OPARETOR', 'HEAD_CASHIER', 'CASHIER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `branchId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `gadgetId` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `branchId` INTEGER NOT NULL,
    `isPaid` BOOLEAN NOT NULL DEFAULT true,
    `commission` DOUBLE NOT NULL,

    INDEX `Agent_branchId_idx`(`branchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drewtime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` INTEGER NOT NULL,
    `timePost` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Betting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalBetAmount` DOUBLE NOT NULL,
    `drewtimeId` INTEGER NOT NULL,
    `agentId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `bettingStatus` ENUM('ACTIVE', 'ENDED') NOT NULL DEFAULT 'ACTIVE',
    `drewResultId` INTEGER NULL,
    `transactionId` INTEGER NOT NULL,
    `isBetting` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Betting_drewtimeId_agentId_idx`(`drewtimeId`, `agentId`),
    INDEX `Betting_branchId_drewResultId_idx`(`branchId`, `drewResultId`),
    INDEX `Betting_transactionId_idx`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BetNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `bettingOption` VARCHAR(191) NOT NULL,
    `bettingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrewResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `winNumber` VARCHAR(191) NOT NULL,
    `drewtimeId` INTEGER NOT NULL,
    `agentId` INTEGER NOT NULL,

    UNIQUE INDEX `DrewResult_drewtimeId_key`(`drewtimeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalInAmount` DOUBLE NOT NULL,
    `totalOutAmount` DOUBLE NOT NULL,
    `remiteAmount` DOUBLE NOT NULL,
    `payableAmount` DOUBLE NOT NULL,
    `agentId` INTEGER NOT NULL,
    `status` ENUM('REMIT_AGENT', 'PAID_AGENT', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `userId` INTEGER NOT NULL,

    INDEX `Transaction_agentId_userId_idx`(`agentId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agent` ADD CONSTRAINT `Agent_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_drewtimeId_fkey` FOREIGN KEY (`drewtimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_drewResultId_fkey` FOREIGN KEY (`drewResultId`) REFERENCES `DrewResult`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetNumber` ADD CONSTRAINT `BetNumber_bettingId_fkey` FOREIGN KEY (`bettingId`) REFERENCES `Betting`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewResult` ADD CONSTRAINT `DrewResult_drewtimeId_fkey` FOREIGN KEY (`drewtimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewResult` ADD CONSTRAINT `DrewResult_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
