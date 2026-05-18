-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photourl" TEXT NOT NULL,
    "photooffset" TEXT DEFAULT '0%_0%',
    "location" TEXT NOT NULL,
    "startdate" TIMESTAMPTZ(6) NOT NULL,
    "enddate" TIMESTAMPTZ(6) NOT NULL,
    "rsvp" TEXT,
    "membership" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

