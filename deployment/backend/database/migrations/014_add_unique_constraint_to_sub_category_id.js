/**
 * Migration: Add unique constraint to sub_category_id in project_sub_categories table
 * This ensures that each sub_category_id value is unique across all subcategories globally
 * 
 * Note: This adds a new unique constraint on sub_category_id while keeping the existing composite constraint
 * The composite constraint remains for potential foreign key relationships
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('project_sub_categories', function(table) {
    // Add unique constraint to sub_category_id column only
    // Keep the existing composite constraint as it may be referenced by foreign keys
    table.unique('sub_category_id', 'project_sub_categories_sub_category_id_unique');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('project_sub_categories', function(table) {
    // Remove the unique constraint on sub_category_id
    table.dropUnique('sub_category_id', 'project_sub_categories_sub_category_id_unique');
  });
}; 