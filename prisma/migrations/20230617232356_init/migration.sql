-- CreateEnum
CREATE TYPE "XpMovementCause" AS ENUM ('XPDROP', 'ADMINXP', 'XPIMPORT', 'PRIME', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guildMembers" (
    "displayName" TEXT,
    "avatar" TEXT,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,

    CONSTRAINT "guildMembers_pkey" PRIMARY KEY ("guildId","userId")
);

-- CreateTable
CREATE TABLE "guilds" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bumps" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bumps_pkey" PRIMARY KEY ("guildId","userId","date")
);

-- CreateTable
CREATE TABLE "xpMovements" (
    "id" SERIAL NOT NULL,
    "xp" INTEGER NOT NULL,
    "byUserId" TEXT NOT NULL,
    "forUserId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cause" "XpMovementCause" NOT NULL,
    "guildId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "xpMovements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "guildMembers" ADD CONSTRAINT "guildMembers_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guildMembers" ADD CONSTRAINT "guildMembers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bumps" ADD CONSTRAINT "bumps_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bumps" ADD CONSTRAINT "bumps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "xpMovements" ADD CONSTRAINT "xpMovements_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guilds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
