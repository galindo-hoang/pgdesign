/**
 * Migration: Add NOT NULL constraint to project_sub_category_id in project_details table
 * This ensures that every project must have a valid subcategory assigned
 * 
 * Prerequisites:
 * - All existing records with NULL project_sub_category_id must be updated first
 * - Run updateNullProjectSubCategoryId.js script before applying this migration
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    // Drop the existing foreign key constraint that allows SET NULL
    table.dropForeign(['project_sub_category_id']);
  })
  .then(() => {
    // Alter the column to NOT NULL
    return knex.schema.alterTable('project_details', function(table) {
      table.integer('project_sub_category_id').unsigned().notNullable().alter();
    });
  })
  .then(() => {
    // Re-add the foreign key constraint with RESTRICT behavior
    return knex.schema.alterTable('project_details', function(table) {
      table.foreign('project_sub_category_id').references('id').inTable('project_sub_categories').onDelete('RESTRICT');
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    // Drop the RESTRICT foreign key constraint
    table.dropForeign(['project_sub_category_id']);
  })
  .then(() => {
    // Revert the column back to nullable
    return knex.schema.alterTable('project_details', function(table) {
      table.integer('project_sub_category_id').unsigned().nullable().alter();
    });
  })
  .then(() => {
    // Re-add the original foreign key constraint with SET NULL behavior
    return knex.schema.alterTable('project_details', function(table) {
      table.foreign('project_sub_category_id').references('id').inTable('project_sub_categories').onDelete('SET NULL');
    });
  });
}; 