import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableMensagens1641427308708 implements MigrationInterface {
  private tabelaMensagens: Table = new Table({
    name: "mensagens",
    columns: [
      {
        name: "uid",
        type: "uuid",
        isPrimary: true,
        isNullable: false,
      },
      {
        name: "descricao",
        type: "varchar",
        length: "50",
        isNullable: false,
      },
      {
        name: "detalhamento",
        type: "varchar",
        length: "200",
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
      {
        name: "user_uid",
        type: "uuid",
        isNullable: false,
      },
    ],
    foreignKeys: [
      {
        name: "fk_mensagens_users",
        columnNames: ["user_uid"],
        referencedTableName: "users",
        referencedColumnNames: ["uid"],
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.tabelaMensagens);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mensagens");
  }
}
