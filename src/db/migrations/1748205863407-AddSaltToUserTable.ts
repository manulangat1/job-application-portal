import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSaltToUserTable1748205863407 implements MigrationInterface {
  name = 'AddSaltToUserTable1748205863407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "hash" TO "salt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "salt" TO "hash"`,
    );
  }
}
