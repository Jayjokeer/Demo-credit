import { Knex } from 'knex';
import { TransactionStatus, TransactionType } from '../enums/transaction.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.integer('sender_wallet_id').unsigned().nullable().references('id').inTable('wallets').onDelete('SET NULL');
    table.integer('receiver_wallet_id').unsigned().nullable().references('id').inTable('wallets').onDelete('SET NULL');
    table.enum('type', Object.values(TransactionType)).notNullable();
    table.decimal('amount', 14, 2).notNullable();
    table.enum('status', Object.values(TransactionStatus)).defaultTo(TransactionStatus.SUCCESS);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
}