const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateUserActionHistoryTable1718450992947 {
    name = 'CreateUserActionHistoryTable1718450992947'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_actions_actiontype_enum" AS ENUM('CREATED', 'UPDATED')`);
        await queryRunner.query(`CREATE TABLE "user_actions" ("id" SERIAL NOT NULL, "actionType" "public"."user_actions_actiontype_enum" NOT NULL, "userId" uuid NOT NULL, "actionData" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c8a683381b553ee59ce5b7b13a" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_actions"`);
        await queryRunner.query(`DROP TYPE "public"."user_actions_actiontype_enum"`);
    }
}
