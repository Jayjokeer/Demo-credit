import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.integer("senderId").unsigned();
    table.integer("receiverId").unsigned();
    table.decimal("amount", 10, 2).notNullable();
    table.enum("type", ["fund", "transfer", "withdraw"]);
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable("transactions");

}

