/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("project_categories", function (table) {
    table.specificType("background_image_blob", "LONGBLOB").nullable().alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("project_categories", function (table) {
    table.specificType("background_image_blob", "TEXT").nullable().alter(); // Revert to TEXT
  });
};
