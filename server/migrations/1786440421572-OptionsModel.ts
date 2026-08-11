import type{ MigrationInterface, QueryRunner } from "typeorm";

export class OptionsModel1786440421572 implements MigrationInterface {
    name = 'OptionsModel1786440421572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "option" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poll_id" uuid, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61"`);
        await queryRunner.query(`DROP TABLE "options"`);
    }

}
