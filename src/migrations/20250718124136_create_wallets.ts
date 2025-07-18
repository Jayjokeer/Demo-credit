import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable("wallets", (table) => {
    table.increments("id").primary();
    table.integer("userId").unsigned().references("id").inTable("users");
    table.decimal("balance", 10, 2).defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("wallets");
}