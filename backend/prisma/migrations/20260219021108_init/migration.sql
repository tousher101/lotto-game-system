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
    `agentCode` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `branchId` INTEGER NOT NULL,
    `cashierId` INTEGER NULL,
    `assignStatus` ENUM('ASSIGNED', 'NOT_ASSIGNED') NOT NULL DEFAULT 'NOT_ASSIGNED',
    `isPaid` BOOLEAN NOT NULL DEFAULT true,
    `commission` DOUBLE NOT NULL,

    UNIQUE INDEX `Agent_userName_key`(`userName`),
    INDEX `Agent_branchId_cashierId_idx`(`branchId`, `cashierId`),
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
    `betTrxId` VARCHAR(191) NOT NULL,
    `drewTimeId` INTEGER NOT NULL,
    `agentId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `qrPayload` VARCHAR(191) NOT NULL,
    `isBetting` BOOLEAN NOT NULL DEFAULT false,
    `betSessionId` INTEGER NOT NULL,
    `isVoid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Betting_qrPayload_key`(`qrPayload`),
    INDEX `Betting_agentId_idx`(`agentId`),
    INDEX `Betting_branchId_idx`(`branchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BetNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `bettingOption` ENUM('L_2', 'S_3', 'RS_3') NOT NULL,
    `bettingId` INTEGER NULL,
    `agentId` INTEGER NOT NULL,
    `drewTimeId` INTEGER NOT NULL,

    INDEX `BetNumber_bettingId_agentId_idx`(`bettingId`, `agentId`),
    INDEX `BetNumber_drewTimeId_idx`(`drewTimeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrewResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `winNumberStright` VARCHAR(191) NOT NULL,
    `winNumberLast2` VARCHAR(191) NOT NULL,
    `drewTimeId` INTEGER NOT NULL,
    `drewSessionId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DrewResult_drewSessionId_key`(`drewSessionId`),
    INDEX `DrewResult_drewTimeId_drewSessionId_idx`(`drewTimeId`, `drewSessionId`),
    INDEX `DrewResult_branchId_idx`(`branchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DrewSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drewTimeId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `drewSessionTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `drewSessionStatus` ENUM('ACTIVE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalInAmount` DOUBLE NULL,
    `totalOutAmount` DOUBLE NULL,
    `grossRemit` DOUBLE NULL,
    `grossPayable` DOUBLE NULL,
    `netRmiteAmount` DOUBLE NULL,
    `netPayableAmount` DOUBLE NULL,
    `debitCredit` DOUBLE NULL,
    `agentId` INTEGER NOT NULL,
    `status` ENUM('SETTELED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `branchId` INTEGER NOT NULL,
    `drewTimeId` INTEGER NOT NULL,
    `betSessionId` INTEGER NOT NULL,
    `drewSessionId` INTEGER NOT NULL,
    `comissionAmount` DOUBLE NOT NULL,
    `bettingFee` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Transaction_agentId_idx`(`agentId`),
    INDEX `Transaction_branchId_betSessionId_idx`(`branchId`, `betSessionId`),
    INDEX `Transaction_drewSessionId_drewTimeId_idx`(`drewSessionId`, `drewTimeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgentWining` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `bettingOption` VARCHAR(191) NOT NULL,
    `betTrxId` VARCHAR(191) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AgentWining_transactionId_idx`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HotNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `limit` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `branchId` INTEGER NOT NULL,
    `drewTimeId` INTEGER NOT NULL,
    `betSessionId` INTEGER NOT NULL,

    UNIQUE INDEX `HotNumber_number_branchId_key`(`number`, `branchId`),
    UNIQUE INDEX `HotNumber_drewTimeId_key`(`drewTimeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BetSession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drewTimeId` INTEGER NOT NULL,
    `branchId` INTEGER NOT NULL,
    `betSessionTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `betSessionStatus` ENUM('ACTIVE', 'CUT_OFF', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agent` ADD CONSTRAINT `Agent_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agent` ADD CONSTRAINT `Agent_cashierId_fkey` FOREIGN KEY (`cashierId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Betting` ADD CONSTRAINT `Betting_betSessionId_fkey` FOREIGN KEY (`betSessionId`) REFERENCES `BetSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetNumber` ADD CONSTRAINT `BetNumber_bettingId_fkey` FOREIGN KEY (`bettingId`) REFERENCES `Betting`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetNumber` ADD CONSTRAINT `BetNumber_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetNumber` ADD CONSTRAINT `BetNumber_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewResult` ADD CONSTRAINT `DrewResult_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewResult` ADD CONSTRAINT `DrewResult_drewSessionId_fkey` FOREIGN KEY (`drewSessionId`) REFERENCES `DrewSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewResult` ADD CONSTRAINT `DrewResult_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewSession` ADD CONSTRAINT `DrewSession_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DrewSession` ADD CONSTRAINT `DrewSession_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_betSessionId_fkey` FOREIGN KEY (`betSessionId`) REFERENCES `BetSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_drewSessionId_fkey` FOREIGN KEY (`drewSessionId`) REFERENCES `DrewSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AgentWining` ADD CONSTRAINT `AgentWining_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotNumber` ADD CONSTRAINT `HotNumber_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotNumber` ADD CONSTRAINT `HotNumber_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HotNumber` ADD CONSTRAINT `HotNumber_betSessionId_fkey` FOREIGN KEY (`betSessionId`) REFERENCES `BetSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetSession` ADD CONSTRAINT `BetSession_drewTimeId_fkey` FOREIGN KEY (`drewTimeId`) REFERENCES `Drewtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BetSession` ADD CONSTRAINT `BetSession_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
