exports.up = function(knex) {
  return knex.schema
    .createTable('solution_header', function(table) {
      table.increments('id').primary();
      table.string('main_headline', 255).notNullable();
      table.string('sub_headline', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('solution_items', function(table) {
      table.increments('id').primary();
      table.integer('solution_header_id').unsigned().references('id').inTable('solution_header').onDelete('CASCADE');
      table.string('image_url', 500).notNullable();
      table.string('image_alt', 255).defaultTo('');
      table.string('category', 100).notNullable();
      table.string('title', 255).notNullable();
      table.string('link', 500).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['solution_header_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('solution_items')
    .dropTableIfExists('solution_header');
}; 