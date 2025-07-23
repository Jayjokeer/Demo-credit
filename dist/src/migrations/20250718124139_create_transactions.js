"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const transaction_enum_1 = require("../enums/transaction.enum");
async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.integer('sender_wallet_id').unsigned().nullable().references('id').inTable('wallets').onDelete('SET NULL');
        table.integer('receiver_wallet_id').unsigned().nullable().references('id').inTable('wallets').onDelete('SET NULL');
        table.enum('type', Object.values(transaction_enum_1.TransactionType)).notNullable();
        table.decimal('amount', 14, 2).notNullable();
        table.enum('status', Object.values(transaction_enum_1.TransactionStatus)).defaultTo(transaction_enum_1.TransactionStatus.SUCCESS);
        table.timestamps(true, true);
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists('transactions');
}
