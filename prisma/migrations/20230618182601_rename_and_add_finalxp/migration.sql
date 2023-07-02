/*
  Warnings:

  - You are about to drop the column `xp` on the `xpMovements` table. All the data in the column will be lost.
  - Added the required column `finalXp` to the `xpMovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xpAmount` to the `xpMovements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "xpMovements" DROP COLUMN "xp",
ADD COLUMN     "finalXp" INTEGER NOT NULL,
ADD COLUMN     "xpAmount" INTEGER NOT NULL;
