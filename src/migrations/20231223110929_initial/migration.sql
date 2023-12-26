-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "sitename" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "View_sitename_key" ON "View"("sitename");

-- CreateIndex
CREATE UNIQUE INDEX "View_key_key" ON "View"("key");
