-- CreateTable
CREATE TABLE `SharedTaskItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taskItemId` INTEGER NOT NULL,
    `sharedWith` INTEGER NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SharedTaskItem` ADD CONSTRAINT `SharedTaskItem_taskItemId_fkey` FOREIGN KEY (`taskItemId`) REFERENCES `TaskItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SharedTaskItem` ADD CONSTRAINT `SharedTaskItem_sharedWith_fkey` FOREIGN KEY (`sharedWith`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
