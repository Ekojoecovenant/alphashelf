import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1765815623461 implements MigrationInterface {
  name = 'InitSchema1765815623461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "bio" character varying, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "publicationYear" character varying, "isbn" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_authors_author" ("bookId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_963de00068693ab6e5767de614b" PRIMARY KEY ("bookId", "authorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bf58ffb2a12a8609a738ee8ca" ON "book_authors_author" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a4cafdf2ec9974524a5321c751" ON "book_authors_author" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "book_categories_category" ("bookId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_baff6a8cd85658522dd9568a6ba" PRIMARY KEY ("bookId", "categoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f2c919594cd1b6386240d6d46" ON "book_categories_category" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_83b564c6e2518a2af3c60ac9da" ON "book_categories_category" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD CONSTRAINT "FK_b90677e3d515d915033134fc5f4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_3f2c919594cd1b6386240d6d464" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories_category" ADD CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_83b564c6e2518a2af3c60ac9da6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_categories_category" DROP CONSTRAINT "FK_3f2c919594cd1b6386240d6d464"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" DROP CONSTRAINT "FK_b90677e3d515d915033134fc5f4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_83b564c6e2518a2af3c60ac9da"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f2c919594cd1b6386240d6d46"`,
    );
    await queryRunner.query(`DROP TABLE "book_categories_category"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a4cafdf2ec9974524a5321c751"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bf58ffb2a12a8609a738ee8ca"`,
    );
    await queryRunner.query(`DROP TABLE "book_authors_author"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
