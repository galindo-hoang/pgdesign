exports.up = function(knex) {
  return knex.schema.alterTable('service_page_process_sections', function(table) {
    // Drop the existing title column
    table.dropColumn('title');
  })
  .then(() => {
    return knex.schema.alterTable('service_page_process_sections', function(table) {
      // Add the new title column as JSON
      table.json('title').notNullable();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('service_page_process_sections', function(table) {
    // Drop the JSON title column
    table.dropColumn('title');
  })
  .then(() => {
    return knex.schema.alterTable('service_page_process_sections', function(table) {
      // Add back the original VARCHAR title column
      table.string('title', 300).notNullable();
    });
  });
}; 