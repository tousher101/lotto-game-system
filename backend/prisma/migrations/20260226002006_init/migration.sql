/*
  Warnings:

  - Added the required column `betSessionId` to the `BetNumber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `betnumber` ADD COLUMN `betSessionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BetNumber` ADD CONSTRAINT `BetNumber_betSessionId_fkey` FOREIGN KEY (`betSessionId`) REFERENCES `BetSession`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
