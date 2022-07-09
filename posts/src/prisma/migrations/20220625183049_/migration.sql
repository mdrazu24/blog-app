/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
