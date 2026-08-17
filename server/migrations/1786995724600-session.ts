import type { MigrationInterface, QueryRunner } from "typeorm";

export class Session1786995724600 implements MigrationInterface {
    name = 'Session1786995724600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_2f42fa907aefe938e3da9e98cda" UNIQUE ("user_id", "poll_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_2f42fa907aefe938e3da9e98cda"`);
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
