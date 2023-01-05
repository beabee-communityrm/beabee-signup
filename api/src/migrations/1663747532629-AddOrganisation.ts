import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganisation1663747532629 implements MigrationInterface {
  name = 'AddOrganisation1663747532629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organisation" ("id" character varying NOT NULL, "name" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "city" character varying NOT NULL, "postcode" character varying NOT NULL, "locale" character varying NOT NULL, CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "organisation"`);
  }
}
