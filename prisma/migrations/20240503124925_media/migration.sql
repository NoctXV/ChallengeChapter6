-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);
