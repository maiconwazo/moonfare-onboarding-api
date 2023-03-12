import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInstanceTable1678638299257 implements MigrationInterface {
  private instance = new Table({
    name: 'instance',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'flowId',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'createdAt',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private instanceStep = new Table({
    name: 'instanceStep',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'instanceId',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'flowId',
        type: 'varchar',
        length: '36',
        isNullable: false,
      },
      {
        name: 'flowStepId',
        type: 'varchar',
        length: '36',
        isNullable: false,
      },
      {
        name: 'createdAt',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.instance);
    await queryRunner.createForeignKey(
      this.instance.name,
      new TableForeignKey({
        columnNames: ['flowId'],
        referencedTableName: 'flow',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createTable(this.instanceStep);
    await queryRunner.createForeignKey(
      this.instanceStep.name,
      new TableForeignKey({
        columnNames: ['instanceId', 'flowId'],
        referencedTableName: 'instance',
        referencedColumnNames: ['id', 'flowId'],
        onDelete: 'cascade',
      }),
    );
    await queryRunner.createForeignKey(
      this.instanceStep.name,
      new TableForeignKey({
        columnNames: ['flowId', 'flowStepId'],
        referencedTableName: 'flowStep',
        referencedColumnNames: ['flowId', 'id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.instanceStep);
    await queryRunner.dropTable(this.instance);
  }
}
