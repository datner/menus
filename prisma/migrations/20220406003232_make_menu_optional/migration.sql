/*
  Warnings:

  - You are about to drop the `Cateogry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CateogryI18L` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurantId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cateogry" DROP CONSTRAINT "Cateogry_menuId_fkey";

-- DropForeignKey
ALTER TABLE "CateogryI18L" DROP CONSTRAINT "CateogryI18L_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Cateogry";

-- DropTable
DROP TABLE "CateogryI18L";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER,
    "restaurantId" INTEGER NOT NULL,
    "identifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryI18L" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT E'',

    CONSTRAINT "CategoryI18L_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_restaurantId_key" ON "Category"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_identifier_key" ON "Category"("identifier");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryI18L" ADD CONSTRAINT "CategoryI18L_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
