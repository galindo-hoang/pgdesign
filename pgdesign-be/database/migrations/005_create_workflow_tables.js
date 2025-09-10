exports.up = function(knex) {
  return knex.schema
    .createTable('workflow_data', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('workflow_tabs', function(table) {
      table.increments('id').primary();
      table.integer('workflow_id').unsigned().references('id').inTable('workflow_data').onDelete('CASCADE');
      table.string('workflow_key', 100).notNullable();
      table.string('icon_name', 100).notNullable();
      table.string('icon_url', 500).notNullable();
      table.string('title', 255).notNullable();
      table.string('diagram_url', 500).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['workflow_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('workflow_tabs')
    .dropTableIfExists('workflow_data');
}; 