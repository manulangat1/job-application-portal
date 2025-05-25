import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLoginCounterTableAndRename1748212050626 implements MigrationInterface {
    name = 'AddLoginCounterTableAndRename1748212050626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_counter" DROP COLUMN "numberOfRetries"`);
        await queryRunner.query(`ALTER TABLE "login_counter" ADD "counter" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "login_counter" ADD "locked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "login_counter" ALTER COLUMN "lockedAt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_counter" ALTER COLUMN "lockedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "login_counter" DROP COLUMN "locked"`);
        await queryRunner.query(`ALTER TABLE "login_counter" DROP COLUMN "counter"`);
        await queryRunner.query(`ALTER TABLE "login_counter" ADD "numberOfRetries" integer NOT NULL DEFAULT '0'`);
    }

}
