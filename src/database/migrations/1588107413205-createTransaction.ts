import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTransaction1588107413205 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'integer',
          },
          {
            name: 'installments',
            type: 'varchar',
          },
          {
            name: 'card_number',
            type: 'varchar',
          },
          {
            name: 'holder',
            type: 'varchar',
          },
          {
            name: 'expiration_date',
            type: 'varchar',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'authorization_code',
            type: 'varchar',
          },
          {
            name: 'payment_id',
            type: 'varchar',
          },
          {
            name: 'received_date',
            type: 'varchar',
          },
          {
            name: 'captured',
            type: 'boolean',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('transactions');
  }

}
