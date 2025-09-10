exports.up = function(knex) {
  return knex.schema.alterTable('solution_items', function(table) {
    // Drop the existing title column
    table.dropColumn('title');
  })
  .then(() => {
    return knex.schema.alterTable('solution_items', function(table) {
      // Add the new title column as JSON
      table.json('title').notNullable();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('solution_items', function(table) {
    // Drop the JSON title column
    table.dropColumn('title');
  })
  .then(() => {
    return knex.schema.alterTable('solution_items', function(table) {
      // Add back the original VARCHAR title column
      table.string('title', 255).notNullable();
    });
  });
}; 