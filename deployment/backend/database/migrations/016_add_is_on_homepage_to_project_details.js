/**
 * Migration: Add isOnHomePage column to project_details table
 * This allows selecting which projects appear in the homepage image slider
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    table.boolean('is_on_homepage').defaultTo(false).comment('Whether this project should appear on the homepage image slider');
    table.index('is_on_homepage', 'idx_project_details_is_on_homepage');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    table.dropIndex('is_on_homepage', 'idx_project_details_is_on_homepage');
    table.dropColumn('is_on_homepage');
  });
}; 