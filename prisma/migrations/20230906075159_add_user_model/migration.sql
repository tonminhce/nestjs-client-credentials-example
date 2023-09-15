-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "authorId" INTEGER;

-- CreateTable
CREATE TABLE "UserArticles" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserArticles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserArticles_email_key" ON "UserArticles"("email");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserArticles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
