exports.up = function(knex) {
  return knex.schema.alterTable('service_page_services', function(table) {
    // Drop the existing description column
    table.dropColumn('description');
  })
  .then(() => {
    return knex.schema.alterTable('service_page_services', function(table) {
      // Add the new description column as JSON
      table.json('description').notNullable();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('service_page_services', function(table) {
    // Drop the JSON description column
    table.dropColumn('description');
  })
  .then(() => {
    return knex.schema.alterTable('service_page_services', function(table) {
      // Add back the original TEXT description column
      table.text('description').notNullable();
    });
  });
}; 