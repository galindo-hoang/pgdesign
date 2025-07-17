/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // About Project Data Table
    .createTable('about_project_data', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.string('subtitle', 255).notNullable();
      table.text('background_image_url').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    
    // Stats Section Data Table
    .createTable('stats_section_data', function(table) {
      table.increments('id').primary();
      table.string('main_headline', 255).notNullable();
      table.string('sub_headline', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    
    // Stats Items Table
    .createTable('stats_items', function(table) {
      table.increments('id').primary();
      table.integer('stats_section_id').unsigned().notNullable();
      table.string('icon_name', 255).notNullable();
      table.text('icon_url').notNullable();
      table.integer('target_value').notNullable();
      table.string('label', 255).notNullable();
      table.string('suffix', 50).notNullable();
      table.text('description').notNullable();
      table.text('background_image_url').notNullable();
      table.string('category', 100).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      
      table.foreign('stats_section_id').references('id').inTable('stats_section_data').onDelete('CASCADE');
    })
    
    // Project Categories Data Table
    .createTable('project_categories_data', function(table) {
      table.increments('id').primary();
      table.string('main_title', 255).notNullable();
      table.string('subtitle', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    
    // Project Categories Table
    .createTable('project_categories', function(table) {
      table.increments('id').primary();
      table.integer('categories_data_id').unsigned().notNullable();
      table.string('category_id', 100).notNullable();
      table.string('title', 255).notNullable();
      table.integer('project_count').defaultTo(0);
      table.text('background_image_url').notNullable();
      table.string('navigation_path', 255).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      
      table.foreign('categories_data_id').references('id').inTable('project_categories_data').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_categories')
    .dropTableIfExists('project_categories_data')
    .dropTableIfExists('stats_items')
    .dropTableIfExists('stats_section_data')
    .dropTableIfExists('about_project_data');
}; 