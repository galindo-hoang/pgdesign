/**
 * Migration: Add S3 URL field to about_project
 * 
 * This migration:
 * 1. Adds new URL column (background_image_url) to about_project
 * 2. Keeps old blob column for backward compatibility during migration
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  console.log('🔄 Starting migration: Add S3 URL to about_project...');

  // Check if table exists first
  const tableExists = await knex.schema.hasTable('about_project');
  
  if (!tableExists) {
    console.log('⚠️  Table about_project does not exist, skipping migration');
    return;
  }

  // Add new URL column for background image
  const hasBackgroundImageUrlColumn = await knex.schema.hasColumn('about_project', 'background_image_url');
  if (!hasBackgroundImageUrlColumn) {
    await knex.schema.alterTable("about_project", (table) => {
      table
        .string("background_image_url", 500)
        .nullable()
        .comment("S3 URL for background image");
    });
    console.log('✅ Added background_image_url column to about_project');
  }

  // Add index for better query performance
  await knex.schema.alterTable("about_project", (table) => {
    table.index('background_image_url');
  });

  console.log('📊 Migration completed for about_project');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  console.log('🔄 Rolling back migration: Remove S3 URL from about_project...');
  
  await knex.schema.alterTable("about_project", (table) => {
    table.dropIndex('background_image_url');
    table.dropColumn("background_image_url");
  });
  
  console.log('✅ Rollback completed');
};

