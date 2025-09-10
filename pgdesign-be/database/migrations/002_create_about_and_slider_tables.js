exports.up = function(knex) {
  return knex.schema
    .createTable('about_data', function(table) {
      table.increments('id').primary();
      table.string('headline', 255).notNullable();
      table.string('sub_headline', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('image_slider_data', function(table) {
      table.increments('id').primary();
      table.string('image_url', 500).notNullable();
      table.string('image_alt', 255).defaultTo('');
      table.string('title', 255).notNullable();
      table.string('subtitle', 255).notNullable();
      table.string('size', 100).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['display_order', 'is_active']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('image_slider_data')
    .dropTableIfExists('about_data');
}; 