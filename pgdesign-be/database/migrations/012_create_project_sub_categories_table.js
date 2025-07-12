/**
 * Migration: Create project_sub_categories table and update relationships
 * - Creates project_sub_categories table
 * - Updates project_details table to use foreign key relationships
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Create project_sub_categories table
    .createTable('project_sub_categories', function(table) {
      table.increments('id').primary();
      table.integer('project_category_id').unsigned().notNullable();
      table.string('sub_category_id', 100).notNullable();
      table.string('title', 255).notNullable();
      table.text('description').nullable();
      table.text('hero_image_url').nullable();
      table.integer('display_order').defaultTo(0);
      table.integer('project_count').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      
      // Foreign key constraint to project_categories
      table.foreign('project_category_id').references('id').inTable('project_categories').onDelete('CASCADE');
      
      // Unique constraint for sub_category_id within each category
      table.unique(['project_category_id', 'sub_category_id'], 'project_sub_cat_unique');
    })
    .then(() => {
      // Add project_sub_category_id column to project_details
      return knex.schema.alterTable('project_details', function(table) {
        table.integer('project_sub_category_id').unsigned().nullable().after('category');
      });
    })
    .then(() => {
      // Add foreign key constraint for project_sub_category_id
      return knex.schema.alterTable('project_details', function(table) {
        table.foreign('project_sub_category_id').references('id').inTable('project_sub_categories').onDelete('SET NULL');
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    // Remove foreign key and column from project_details
    .alterTable('project_details', function(table) {
      table.dropForeign(['project_sub_category_id']);
      table.dropColumn('project_sub_category_id');
    })
    // Drop project_sub_categories table
    .dropTableIfExists('project_sub_categories');
}; 