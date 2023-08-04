-- CreateTable
CREATE TABLE "Article" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
