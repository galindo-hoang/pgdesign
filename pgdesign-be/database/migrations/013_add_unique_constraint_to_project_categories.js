/**
 * Migration: Add unique constraint to category_id in project_categories table
 * This ensures that each category_id value is unique across all project categories
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('project_categories', function(table) {
    // Add unique constraint to category_id column
    table.unique('category_id', 'project_categories_category_id_unique');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('project_categories', function(table) {
    // Remove the unique constraint
    table.dropUnique('category_id', 'project_categories_category_id_unique');
  });
}; 