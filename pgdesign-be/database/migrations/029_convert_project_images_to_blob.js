/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Add new BLOB column for storing project images as base64
  await knex.schema.alterTable("project_details", (table) => {
    table
      .json("project_images_blob")
      .nullable()
      .comment("Array of project images stored as base64 BLOB data");
  });

  // Note: We keep the old project_images column for now to allow gradual migration
  // The old column can be dropped in a future migration after data is migrated
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Remove the BLOB column
  await knex.schema.alterTable("project_details", (table) => {
    table.dropColumn("project_images_blob");
  });
};
