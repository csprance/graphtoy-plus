-- CreateTable
CREATE TABLE "tiny_url" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "adminUrl" TEXT NOT NULL,
    "hits" INTEGER NOT NULL,

    CONSTRAINT "PK_4bcfe746dc3ce856f454336107f" PRIMARY KEY ("id")
);
