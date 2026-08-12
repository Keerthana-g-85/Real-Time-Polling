import type{ MigrationInterface, QueryRunner } from "typeorm";

export class OnDelete1786520204709 implements MigrationInterface {
    name = 'OnDelete1786520204709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_81dda5014b62380b3fdb6859db9"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_af8728cf605f1988d2007d094f5"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0d7459852150cf964af26adcf63"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_d17980c91005358383b7ad59ab0"`);
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e"`);
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1"`);
        await queryRunner.query(`ALTER TABLE "poll" ADD CONSTRAINT "FK_81dda5014b62380b3fdb6859db9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_af8728cf605f1988d2007d094f5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0d7459852150cf964af26adcf63" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_d17980c91005358383b7ad59ab0" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1"`);
        await queryRunner.query(`ALTER TABLE "allowed_user" DROP CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_d17980c91005358383b7ad59ab0"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_0d7459852150cf964af26adcf63"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_af8728cf605f1988d2007d094f5"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61"`);
        await queryRunner.query(`ALTER TABLE "poll" DROP CONSTRAINT "FK_81dda5014b62380b3fdb6859db9"`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_011bbe09dcfb9a732ce493ffff1" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "allowed_user" ADD CONSTRAINT "FK_9eea7e3189558b2d045b547bc0e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_d17980c91005358383b7ad59ab0" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_0d7459852150cf964af26adcf63" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_af8728cf605f1988d2007d094f5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_4e0972d6db48eb74f59164ebd61" FOREIGN KEY ("poll_id") REFERENCES "poll"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "poll" ADD CONSTRAINT "FK_81dda5014b62380b3fdb6859db9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
