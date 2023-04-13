/*
  Warnings:

  - Added the required column `currency` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "currency" TEXT NOT NULL
);
INSERT INTO "new_products" ("description", "id", "price") SELECT "description", "id", "price" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
