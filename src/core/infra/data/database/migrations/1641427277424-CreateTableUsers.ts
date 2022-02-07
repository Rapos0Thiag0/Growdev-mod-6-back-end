import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1641427277424 implements MigrationInterface {
  private tabelaUser: Table = new Table({
    name: "users",
    columns: [
      {
        name: "uid",
        type: "uuid",
        isPrimary: true,
        isNullable: false,
      },
      {
        name: "nome",
        type: "varchar",
        length: "50",
        isUnique: true,
        isNullable: false,
      },
      {
        name: "senha",
        type: "varchar",
        length: "12",
        isNullable: false,
      },
      {
        name: "created_at",
        type: "timestamp",
        isNullable: false,
      },
      {
        name: "updated_at",
        type: "timestamp",
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tabelaUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
