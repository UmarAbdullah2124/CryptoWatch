-- CreateTable
CREATE TABLE "UserSetting" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "critical_sensitivity" DOUBLE PRECISION NOT NULL DEFAULT -2.0,
    "aggressive_polling" BOOLEAN NOT NULL DEFAULT false,
    "email_intelligence" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSetting_user_id_key" ON "UserSetting"("user_id");

-- CreateIndex
CREATE INDEX "UserSetting_user_id_idx" ON "UserSetting"("user_id");

-- AddForeignKey
ALTER TABLE "UserSetting" ADD CONSTRAINT "UserSetting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
