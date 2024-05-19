module.exports = class InitialSchema1716015676015 {
  name = 'InitialSchema1716045676015';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "courseId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_lesson_completion_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "completedAt" datetime NOT NULL, "userId" integer, "lessonId" integer, CONSTRAINT "UQ_5dc040e9acd5f9e5686ce30ec09" UNIQUE ("userId", "lessonId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "isAdmin" boolean NOT NULL DEFAULT (0))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "courseId" integer, CONSTRAINT "FK_3801ccf9533a8627c1dcb1e33bf" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_lesson"("id", "title", "courseId") SELECT "id", "title", "courseId" FROM "lesson"`,
    );
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_lesson" RENAME TO "lesson"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_lesson_completion_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "completedAt" datetime NOT NULL, "userId" integer, "lessonId" integer, CONSTRAINT "UQ_5dc040e9acd5f9e5686ce30ec09" UNIQUE ("userId", "lessonId"), CONSTRAINT "FK_3a2adcdc8c9aa130faf35f2285b" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9205dd3e06631397a6cd4113500" FOREIGN KEY ("lessonId") REFERENCES "lesson" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_lesson_completion_info"("id", "completedAt", "userId", "lessonId") SELECT "id", "completedAt", "userId", "lessonId" FROM "user_lesson_completion_info"`,
    );
    await queryRunner.query(`DROP TABLE "user_lesson_completion_info"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_lesson_completion_info" RENAME TO "user_lesson_completion_info"`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "user_lesson_completion_info" RENAME TO "temporary_user_lesson_completion_info"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_lesson_completion_info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "completedAt" datetime NOT NULL, "userId" integer, "lessonId" integer, CONSTRAINT "UQ_5dc040e9acd5f9e5686ce30ec09" UNIQUE ("userId", "lessonId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user_lesson_completion_info"("id", "completedAt", "userId", "lessonId") SELECT "id", "completedAt", "userId", "lessonId" FROM "temporary_user_lesson_completion_info"`,
    );
    await queryRunner.query(
      `DROP TABLE "temporary_user_lesson_completion_info"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" RENAME TO "temporary_lesson"`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "courseId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "lesson"("id", "title", "courseId") SELECT "id", "title", "courseId" FROM "temporary_lesson"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_lesson"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_lesson_completion_info"`);
    await queryRunner.query(`DROP TABLE "lesson"`);
    await queryRunner.query(`DROP TABLE "course"`);
  }
};
