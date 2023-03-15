import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { Table } from 'typeorm/schema-builder/table/Table';
import { v4 } from 'uuid';

export class CreateFlowTableAndValues1678638263510
  implements MigrationInterface
{
  private flow = new Table({
    name: 'flow',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        length: '36',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'isDefault',
        type: 'bool',
        isNullable: false,
        default: true,
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

  private flowStep = new Table({
    name: 'flowStep',
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
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'order',
        type: 'int',
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
    await queryRunner.createTable(this.flow);
    await queryRunner.createTable(this.flowStep);
    await queryRunner.createForeignKey(
      this.flowStep.name,
      new TableForeignKey({
        columnNames: ['flowId'],
        referencedTableName: 'flow',
        referencedColumnNames: ['id'],
        onDelete: 'cascade',
      }),
    );

    const flowId = v4();
    await queryRunner.query('insert into flow values (?, ?, ?, now(), now())', [
      flowId,
      'Default',
      true,
    ]);

    const steps = [
      { name: 'identification', order: 1 },
      { name: 'consents', order: 2 },
      { name: 'document', order: 3 },
      { name: 'password', order: 4 },
    ];

    steps.forEach(async (step) => {
      await queryRunner.query(
        'insert into flowStep values (?, ?, ?, ?, now(), now())',
        [v4(), flowId, step.name, step.order],
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.flowStep);
    await queryRunner.dropTable(this.flow);
  }
}
