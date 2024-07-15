/*
  Warnings:

  - Added the required column `email` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trip_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "participants_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participants" ("id", "is_confirmed", "is_owner", "name", "trip_id") SELECT "id", "is_confirmed", "is_owner", "name", "trip_id" FROM "participants";
DROP TABLE "participants";
ALTER TABLE "new_participants" RENAME TO "participants";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
