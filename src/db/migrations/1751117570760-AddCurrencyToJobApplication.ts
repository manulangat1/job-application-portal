import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrencyToJobApplication1751117570760 implements MigrationInterface {
    name = 'AddCurrencyToJobApplication1751117570760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."job_application_currency_enum" AS ENUM('KES', 'USD', 'EURO', 'POUND')`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD "currency" "public"."job_application_currency_enum" NOT NULL DEFAULT 'KES'`);
        await queryRunner.query(`ALTER TYPE "public"."job_application_description_enum" RENAME TO "job_application_description_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."job_application_description_enum" AS ENUM('SALARY_MISMATCH', 'OPPORTUNITY_MISMATCH', 'NO_RESPONSE_FROM_RECRUITER')`);
        await queryRunner.query(`ALTER TABLE "job_application" ALTER COLUMN "description" TYPE "public"."job_application_description_enum" USING "description"::"text"::"public"."job_application_description_enum"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_description_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."job_application_description_enum_old" AS ENUM('SALARY_MISMATCH', 'OPPORTUNITY_MISMATCH')`);
        await queryRunner.query(`ALTER TABLE "job_application" ALTER COLUMN "description" TYPE "public"."job_application_description_enum_old" USING "description"::"text"::"public"."job_application_description_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_description_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."job_application_description_enum_old" RENAME TO "job_application_description_enum"`);
        await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "currency"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_currency_enum"`);
    }

}
