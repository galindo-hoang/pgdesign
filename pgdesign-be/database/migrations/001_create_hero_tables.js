exports.up = function(knex) {
  return knex.schema
    .createTable('hero_data', function(table) {
      table.increments('id').primary();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('hero_images', function(table) {
      table.increments('id').primary();
      table.integer('hero_id').unsigned().references('id').inTable('hero_data').onDelete('CASCADE');
      table.string('image_url', 500).notNullable();
      table.string('image_alt', 255).defaultTo('');
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['hero_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('hero_images')
    .dropTableIfExists('hero_data');
}; 