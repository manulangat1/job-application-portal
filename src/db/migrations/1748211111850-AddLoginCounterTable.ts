import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLoginCounterTable1748211111850 implements MigrationInterface {
    name = 'AddLoginCounterTable1748211111850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login_counter" ("id" SERIAL NOT NULL, "numberOfRetries" integer NOT NULL DEFAULT '0', "lockedAt" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_fb0e20d6beb6b736a8caa461763" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "login_counter" ADD CONSTRAINT "FK_b98b70528b0b41de0bed5697b03" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_counter" DROP CONSTRAINT "FK_b98b70528b0b41de0bed5697b03"`);
        await queryRunner.query(`DROP TABLE "login_counter"`);
    }

}
