import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryAndUserFields1663755333827
  implements MigrationInterface
{
  name = 'AddCountryAndUserFields1663755333827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "country" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "firstName" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "lastName" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "passwordHash" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "passwordSalt" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" ADD "passwordIterations" integer NOT NULL DEFAULT '1000'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP COLUMN "passwordIterations"`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP COLUMN "passwordSalt"`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP COLUMN "passwordHash"`
    );
    await queryRunner.query(`ALTER TABLE "organisation" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP COLUMN "lastName"`
    );
    await queryRunner.query(
      `ALTER TABLE "organisation" DROP COLUMN "firstName"`
    );
    await queryRunner.query(`ALTER TABLE "organisation" DROP COLUMN "country"`);
  }
}
