import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeDescriptionNullable1748695413946 implements MigrationInterface {
    name = 'MakeDescriptionNullable1748695413946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_3ae447527d96ae6f670a2620eb" ON "job_application" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3ae447527d96ae6f670a2620eb"`);
        await queryRunner.query(`ALTER TABLE "job_application" ALTER COLUMN "description" SET NOT NULL`);
    }

}
