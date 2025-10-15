/**
 * Migration: Convert from base64 blob storage to S3 URL storage
 * 
 * This migration:
 * 1. Adds new URL columns (thumbnail_image_url, project_images_urls)
 * 2. Keeps old blob columns for backward compatibility during migration
 * 3. Data conversion from base64 to S3 should be done via separate script
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  console.log('🔄 Starting migration: Convert from base64 to S3 URLs...');

  // Add new URL column for thumbnail
  const hasThumbnailUrlColumn = await knex.schema.hasColumn('project_details', 'thumbnail_image_url');
  if (!hasThumbnailUrlColumn) {
    await knex.schema.alterTable("project_details", (table) => {
      table
        .string("thumbnail_image_url", 500)
        .nullable()
        .comment("S3 URL for thumbnail image");
    });
    console.log('✅ Added thumbnail_image_url column');
  }

  // Add new URL column for project images
  const hasProjectImagesUrlsColumn = await knex.schema.hasColumn('project_details', 'project_images_urls');
  if (!hasProjectImagesUrlsColumn) {
    await knex.schema.alterTable("project_details", (table) => {
      table
        .json("project_images_urls")
        .nullable()
        .comment("Array of S3 URLs for project images");
    });
    console.log('✅ Added project_images_urls column');
  }

  // Add index for better query performance
  await knex.schema.alterTable("project_details", (table) => {
    table.index('thumbnail_image_url');
  });

  console.log('📊 Migration structure completed');
  console.log('⚠️  Note: Base64 to S3 URL conversion should be done via separate script');
  console.log('⚠️  Note: Old blob columns (thumbnail_image_blob, project_images_blob) kept for backward compatibility');
  console.log('💡 Tip: Run the data migration script to convert existing base64 data to S3 URLs');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  console.log('🔄 Rolling back migration: Remove S3 URL columns...');
  
  // Remove the URL columns
  await knex.schema.alterTable("project_details", (table) => {
    table.dropIndex('thumbnail_image_url');
    table.dropColumn("thumbnail_image_url");
    table.dropColumn("project_images_urls");
  });
  
  console.log('✅ Rollback completed');
};

