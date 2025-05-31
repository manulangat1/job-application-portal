import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobApplication1748693640754 implements MigrationInterface {
    name = 'AddJobApplication1748693640754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."job_application_status_enum" AS ENUM('APPLIED', 'INTERVIEWING', 'REJECTED', 'OFFER_EXTENDED', 'OFFER_ACCEPTED')`);
        await queryRunner.query(`CREATE TYPE "public"."job_application_description_enum" AS ENUM('SALARY_MISMATCH', 'OPPORTUNITY_MISMATCH')`);
        await queryRunner.query(`CREATE TABLE "job_application" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" "public"."job_application_status_enum" NOT NULL DEFAULT 'APPLIED', "description" "public"."job_application_description_enum" NOT NULL, "link" character varying NOT NULL, "expectedSalary" character varying NOT NULL, "appliedDate" date NOT NULL, "offerExtendedDate" date, "offerRejectedDate" date, "contractSignedDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "job_application" ADD CONSTRAINT "FK_dcd0dce67c5bab03a82f0595af3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_application" DROP CONSTRAINT "FK_dcd0dce67c5bab03a82f0595af3"`);
        await queryRunner.query(`DROP TABLE "job_application"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_description_enum"`);
        await queryRunner.query(`DROP TYPE "public"."job_application_status_enum"`);
    }

}
