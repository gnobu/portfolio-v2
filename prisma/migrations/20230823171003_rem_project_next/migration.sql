/*
  Warnings:

  - You are about to drop the column `next` on the `Project` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "link_type" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "image", "link_type", "link_url", "role", "stack", "title", "type", "year") SELECT "createdAt", "description", "id", "image", "link_type", "link_url", "role", "stack", "title", "type", "year" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
