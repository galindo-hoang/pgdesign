/**
 * Migration: Add S3 URL field to project_categories
 * 
 * This migration:
 * 1. Adds new URL column (background_image_url) to project_categories
 * 2. Keeps old blob column for backward compatibility during migration
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  console.log('🔄 Starting migration: Add S3 URL to project_categories...');

  // Add new URL column for background image
  const hasBackgroundImageUrlColumn = await knex.schema.hasColumn('project_categories', 'background_image_url');
  if (!hasBackgroundImageUrlColumn) {
    await knex.schema.alterTable("project_categories", (table) => {
      table
        .string("background_image_url", 500)
        .nullable()
        .comment("S3 URL for background image");
    });
    console.log('✅ Added background_image_url column to project_categories');
  }

  // Add index for better query performance
  await knex.schema.alterTable("project_categories", (table) => {
    table.index('background_image_url');
  });

  console.log('📊 Migration completed for project_categories');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  console.log('🔄 Rolling back migration: Remove S3 URL from project_categories...');
  
  await knex.schema.alterTable("project_categories", (table) => {
    table.dropIndex('background_image_url');
    table.dropColumn("background_image_url");
  });
  
  console.log('✅ Rollback completed');
};

