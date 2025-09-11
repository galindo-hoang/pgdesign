/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Add new BLOB column for storing background images as base64
  await knex.schema.alterTable("project_categories", (table) => {
    table
      .text("background_image_blob")
      .nullable()
      .comment("Background image stored as base64 BLOB data");
  });

  // Note: We keep the old background_image_url column for now to allow gradual migration
  // The old column can be dropped in a future migration after data is migrated
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Remove the BLOB column
  await knex.schema.alterTable("project_categories", (table) => {
    table.dropColumn("background_image_blob");
  });
};
