-- CreateEnum
CREATE TYPE "XpMouvementCause" AS ENUM ('XPDROP', 'ADMINXP', 'XPIMPORT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildMember" (
    "Username" TEXT,
    "avatar" TEXT,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "guild.name" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,

    CONSTRAINT "GuildMember_pkey" PRIMARY KEY ("guildId","userId")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bump" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "guild.name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bump_pkey" PRIMARY KEY ("guildId","userId","date")
);

-- CreateTable
CREATE TABLE "XpMouvement" (
    "id" SERIAL NOT NULL,
    "xp" INTEGER NOT NULL,
    "byUserId" TEXT NOT NULL,
    "forUserId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cause" "XpMouvementCause" NOT NULL,
    "guildId" TEXT NOT NULL,
    "guild.name" TEXT NOT NULL,

    CONSTRAINT "XpMouvement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bump" ADD CONSTRAINT "Bump_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bump" ADD CONSTRAINT "Bump_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpMouvement" ADD CONSTRAINT "XpMouvement_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
