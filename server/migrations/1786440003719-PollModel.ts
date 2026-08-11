import type{ MigrationInterface, QueryRunner } from "typeorm";

export class PollModel1786440003719 implements MigrationInterface {
    name = 'PollModel1786440003719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "poll" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "poll_name" character varying NOT NULL, "question" character varying NOT NULL, "expire_time" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_03b5cf19a7f562b231c3458527e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "poll" ADD CONSTRAINT "FK_81dda5014b62380b3fdb6859db9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_81dda5014b62380b3fdb6859db9"`);
        await queryRunner.query(`DROP TABLE "poll"`);
    }

}
