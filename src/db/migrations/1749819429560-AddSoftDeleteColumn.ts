import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSoftDeleteColumn1749819429560 implements MigrationInterface {
  name = 'AddSoftDeleteColumn1749819429560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD "deletedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP COLUMN "deletedAt"`,
    );
  }
}
