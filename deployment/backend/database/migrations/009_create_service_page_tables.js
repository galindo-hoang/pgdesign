/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return Promise.all([
    // Service Page Hero Content Table
    knex.schema.createTable('service_page_hero', function(table) {
      table.increments('id').primary();
      table.string('main_title', 100).notNullable();
      table.string('brand_name', 100).notNullable();
      table.text('description').notNullable();
      table.string('hero_image_url', 500);
      table.boolean('is_active').defaultTo(true);
      table.integer('display_order').defaultTo(1);
      table.timestamps(true, true);
    }),

    // Service Page Services Table
    knex.schema.createTable('service_page_services', function(table) {
      table.increments('id').primary();
      table.string('title', 200).notNullable();
      table.string('subtitle', 200).defaultTo('');
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.integer('display_order').notNullable();
      table.timestamps(true, true);
    }),

    // Service Page Process Sections Table
    knex.schema.createTable('service_page_process_sections', function(table) {
      table.increments('id').primary();
      table.integer('process_number').notNullable().unique();
      table.string('title', 300).notNullable();
      table.text('description').notNullable();
      table.text('note').defaultTo('');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    }),

    // Service Page Construction Sections Table
    knex.schema.createTable('service_page_construction_sections', function(table) {
      table.increments('id').primary();
      table.integer('section_number').notNullable().unique();
      table.string('title_left', 200).notNullable();
      table.json('contents_left').notNullable(); // Array of strings
      table.string('title_right', 200).notNullable();
      table.json('contents_right').notNullable(); // Array of strings
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('service_page_construction_sections'),
    knex.schema.dropTableIfExists('service_page_process_sections'),
    knex.schema.dropTableIfExists('service_page_services'),
    knex.schema.dropTableIfExists('service_page_hero')
  ]);
}; 