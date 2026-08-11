import type{ MigrationInterface, QueryRunner } from "typeorm";

export class AllowedUser1786441207648 implements MigrationInterface {
    name = 'AllowedUser1786441207648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "allowed_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, "poll_id" uuid, CONSTRAINT "PK_efe49c308a3cd697502bb389ce1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1"`);
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e"`);
        await queryRunner.query(`DROP TABLE "allowed_user"`);
    }

}
