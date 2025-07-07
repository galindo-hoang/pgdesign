exports.up = function(knex) {
  return knex.schema
    .createTable('stats_header', function(table) {
      table.increments('id').primary();
      table.string('main_headline', 255).notNullable();
      table.string('sub_headline', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('stats_items', function(table) {
      table.increments('id').primary();
      table.integer('stats_header_id').unsigned().references('id').inTable('stats_header').onDelete('CASCADE');
      table.string('icon_name', 100).notNullable();
      table.string('icon_url', 500).notNullable();
      table.integer('target_value').notNullable();
      table.string('label', 255).notNullable();
      table.string('suffix', 20).notNullable();
      table.string('description', 255).notNullable();
      table.string('background_image_url', 500).notNullable();
      table.string('category', 100).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['stats_header_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('stats_items')
    .dropTableIfExists('stats_header');
}; 