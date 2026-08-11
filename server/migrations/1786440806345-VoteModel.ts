import type{ MigrationInterface, QueryRunner } from "typeorm";

export class VoteModel1786440806345 implements MigrationInterface {
    name = 'VoteModel1786440806345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "poll_id" uuid, "option_id" uuid, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_af8728cf605f1988d2007d094f5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0d7459852150cf964af26adcf63" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_d17980c91005358383b7ad59ab0" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_d17980c91005358383b7ad59ab0"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0d7459852150cf964af26adcf63"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_af8728cf605f1988d2007d094f5"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
