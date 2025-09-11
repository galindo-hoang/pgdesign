exports.up = function(knex) {
  return knex.schema.table('project_categories', function(table) {
    // Drop the existing column and recreate with larger size
    table.dropColumn('background_image_blob');
  }).then(() => {
    return knex.schema.table('project_categories', function(table) {
      // Create with LONGTEXT to handle very large base64 images
      table.text('background_image_blob').nullable().comment('Background image stored as base64 encoded data');
    });
  });
};

exports.down = function(knex) {
  return knex.schema.table('project_categories', function(table) {
    // Drop the LONGTEXT column
    table.dropColumn('background_image_blob');
  }).then(() => {
    return knex.schema.table('project_categories', function(table) {
      // Recreate with original LONGBLOB size
      table.specificType('background_image_blob', 'LONGBLOB').nullable().comment('Background image stored as base64 encoded BLOB');
    });
  });
};
