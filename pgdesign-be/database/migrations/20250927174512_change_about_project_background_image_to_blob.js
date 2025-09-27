/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('about_project_data', function(table) {
    // Drop the old background_image_url column
    table.dropColumn('background_image_url');
    // Add new background_image_blob column for base64 data (LONGTEXT for large base64 strings)
    table.specificType('background_image_blob', 'LONGTEXT').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('about_project_data', function(table) {
    // Drop the new background_image_blob column
    table.dropColumn('background_image_blob');
    // Add back the old background_image_url column
    table.string('background_image_url').nullable();
  });
};
