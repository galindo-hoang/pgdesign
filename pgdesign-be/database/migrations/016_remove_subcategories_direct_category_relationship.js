/**
 * Migration: Remove subcategories and establish direct category-project relationship
 * This migration:
 * 1. Adds project_category_id foreign key to project_details
 * 2. Populates the new field based on existing subcategory relationships
 * 3. Removes subcategory-related columns and constraints
 * 4. Drops the project_sub_categories table
 * 5. Keeps project_categories_data and project_categories unchanged
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Step 1: Add new project_category_id column to project_details
    .alterTable('project_details', function(table) {
      table.integer('project_category_id').unsigned().nullable();
    })
    .then(() => {
      // Step 2: Populate project_category_id from existing subcategory relationships
      return knex.raw(`
        UPDATE project_details pd 
        JOIN project_sub_categories psc ON pd.project_sub_category_id = psc.id 
        SET pd.project_category_id = psc.project_category_id
      `);
    })
    .then(() => {
      // Step 3: Make project_category_id NOT NULL after population
      return knex.schema.alterTable('project_details', function(table) {
        table.integer('project_category_id').unsigned().notNullable().alter();
      });
    })
    .then(() => {
      // Step 4: Add foreign key constraint for project_category_id
      return knex.schema.alterTable('project_details', function(table) {
        table.foreign('project_category_id').references('id').inTable('project_categories').onDelete('RESTRICT');
      });
    })
    .then(() => {
      // Step 5: Remove old subcategory foreign key constraint
      return knex.schema.alterTable('project_details', function(table) {
        table.dropForeign(['project_sub_category_id']);
      });
    })
    .then(() => {
      // Step 6: Remove subcategory-related columns from project_details
      return knex.schema.alterTable('project_details', function(table) {
        table.dropColumn('project_sub_category_id');
        table.dropColumn('sub_category');
      });
    })
    .then(() => {
      // Step 7: Drop the project_sub_categories table entirely
      return knex.schema.dropTableIfExists('project_sub_categories');
    })
    .then(() => {
      // Step 8: Add index for the new foreign key
      return knex.schema.alterTable('project_details', function(table) {
        table.index('project_category_id');
      });
    })
    .then(() => {
      // Step 9: Update project counts in project_categories table
      return knex.raw(`
        UPDATE project_categories pc 
        SET project_count = (
          SELECT COUNT(*) 
          FROM project_details pd 
          WHERE pd.project_category_id = pc.id 
          AND pd.is_active = 1
        )
      `);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    // Recreate project_sub_categories table
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
      
      table.foreign('project_category_id').references('id').inTable('project_categories').onDelete('CASCADE');
      table.unique(['project_category_id', 'sub_category_id'], 'project_sub_cat_unique');
      table.unique('sub_category_id');
    })
    .then(() => {
      // Add back subcategory columns to project_details
      return knex.schema.alterTable('project_details', function(table) {
        table.integer('project_sub_category_id').unsigned().nullable();
        table.string('sub_category', 100).nullable();
      });
    })
    .then(() => {
      // Remove the direct category foreign key
      return knex.schema.alterTable('project_details', function(table) {
        table.dropForeign(['project_category_id']);
        table.dropIndex(['project_category_id']);
        table.dropColumn('project_category_id');
      });
    })
    .then(() => {
      // Re-add subcategory foreign key
      return knex.schema.alterTable('project_details', function(table) {
        table.foreign('project_sub_category_id').references('id').inTable('project_sub_categories').onDelete('SET NULL');
        table.index('sub_category');
      });
    });
}; 