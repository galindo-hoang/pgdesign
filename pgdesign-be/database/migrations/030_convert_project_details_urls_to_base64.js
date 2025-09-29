/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  console.log('🔄 Starting migration: Convert project details URLs to base64...');

  // Add new BLOB column for thumbnail_image
  await knex.schema.alterTable("project_details", (table) => {
    table
      .text("thumbnail_image_blob", 'longtext')
      .nullable()
      .comment("Thumbnail image stored as base64 BLOB data");
  });

  console.log('✅ Added thumbnail_image_blob column');

  // Note: project_images_blob column already exists from migration 029
  // If it doesn't exist, add it
  const hasProjectImagesBlob = await knex.schema.hasColumn('project_details', 'project_images_blob');
  if (!hasProjectImagesBlob) {
    await knex.schema.alterTable("project_details", (table) => {
      table
        .json("project_images_blob")
        .nullable()
        .comment("Array of project images stored as base64 BLOB data");
    });
    console.log('✅ Added project_images_blob column');
  }

  console.log('📊 Migration structure completed');
  console.log('⚠️  Note: Image URL to base64 conversion should be done via a separate script');
  console.log('⚠️  Note: Old URL columns (thumbnail_image, project_images) kept for now');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Remove the BLOB columns
  await knex.schema.alterTable("project_details", (table) => {
    table.dropColumn("thumbnail_image_blob");
    // Don't drop project_images_blob here as it might be used by other migrations
  });
};

