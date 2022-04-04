/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `Cateogry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cateogry_identifier_key" ON "Cateogry"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_identifier_key" ON "Menu"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Order_identifier_key" ON "Order"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_identifier_key" ON "Restaurant"("identifier");
