/*
  Warnings:

  - You are about to drop the column `createdAt` on the `task` table. All the data in the column will be lost.
  - Made the column `userId` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `createdAt`,
    MODIFY `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SharedTask` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTask` ADD CONSTRAINT `SharedTask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTask` ADD CONSTRAINT `SharedTask_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
