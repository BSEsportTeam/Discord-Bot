/*
  Warnings:

  - You are about to drop the column `Username` on the `GuildMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GuildMember" DROP COLUMN "Username",
ADD COLUMN     "username" TEXT;
