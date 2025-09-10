/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Blog Hero Section Table
    .createTable('blog_hero_data', function(table) {
      table.increments('id').primary();
      table.string('title', 500).notNullable().comment('Hero section title');
      table.text('subtitle').notNullable().comment('Hero section subtitle');
      table.boolean('is_active').defaultTo(true).comment('Whether the hero is active');
      table.integer('display_order').defaultTo(1).comment('Display order');
      table.timestamps(true, true);
      
      table.index('is_active');
      table.index('display_order');
    })
    
    // Blog Project Items Table
    .createTable('blog_project_items', function(table) {
      table.increments('id').primary();
      table.string('project_id', 100).notNullable().unique().comment('Unique project identifier');
      table.string('title', 500).notNullable().comment('Project title');
      table.string('image_url', 500).notNullable().comment('Project image URL');
      table.string('area', 50).notNullable().comment('Project area');
      table.string('style', 200).notNullable().comment('Project style');
      table.string('client_name', 200).notNullable().comment('Client name');
      table.string('location', 200).notNullable().comment('Project location');
      table.boolean('is_active').defaultTo(true).comment('Whether the project is active');
      table.integer('display_order').defaultTo(0).comment('Display order');
      table.timestamps(true, true);
      
      table.index('project_id');
      table.index('is_active');
      table.index('display_order');
      table.index('style');
      table.index('location');
    })
    
    // Content Section Table
    .createTable('blog_content_sections', function(table) {
      table.increments('id').primary();
      table.string('main_title', 500).notNullable().comment('Main content title');
      table.text('intro_text').notNullable().comment('Introduction text');
      table.string('design_styles_title', 300).notNullable().comment('Design styles section title');
      table.string('factors_title', 300).notNullable().comment('Important factors section title');
      table.string('process_title', 300).notNullable().comment('Process section title');
      table.boolean('is_active').defaultTo(true).comment('Whether the content section is active');
      table.integer('display_order').defaultTo(1).comment('Display order');
      table.timestamps(true, true);
      
      table.index('is_active');
      table.index('display_order');
    })
    
    // Design Styles Table
    .createTable('blog_design_styles', function(table) {
      table.increments('id').primary();
      table.integer('content_section_id').unsigned().notNullable().comment('Reference to content section');
      table.string('name', 300).notNullable().comment('Design style name');
      table.text('description').notNullable().comment('Design style description');
      table.integer('display_order').defaultTo(0).comment('Display order');
      table.boolean('is_active').defaultTo(true).comment('Whether the design style is active');
      table.timestamps(true, true);
      
      table.foreign('content_section_id').references('id').inTable('blog_content_sections').onDelete('CASCADE');
      table.index('content_section_id');
      table.index('display_order');
      table.index('is_active');
    })
    
    // Important Factors Table
    .createTable('blog_important_factors', function(table) {
      table.increments('id').primary();
      table.integer('content_section_id').unsigned().notNullable().comment('Reference to content section');
      table.string('title', 300).notNullable().comment('Factor title');
      table.text('description').notNullable().comment('Factor description');
      table.integer('display_order').defaultTo(0).comment('Display order');
      table.boolean('is_active').defaultTo(true).comment('Whether the factor is active');
      table.timestamps(true, true);
      
      table.foreign('content_section_id').references('id').inTable('blog_content_sections').onDelete('CASCADE');
      table.index('content_section_id');
      table.index('display_order');
      table.index('is_active');
    })
    
    // Process Steps Table
    .createTable('blog_process_steps', function(table) {
      table.increments('id').primary();
      table.integer('content_section_id').unsigned().notNullable().comment('Reference to content section');
      table.string('step_number', 10).notNullable().comment('Step number (e.g., "01", "02")');
      table.string('title', 300).notNullable().comment('Step title');
      table.text('description').notNullable().comment('Step description');
      table.integer('display_order').defaultTo(0).comment('Display order');
      table.boolean('is_active').defaultTo(true).comment('Whether the step is active');
      table.timestamps(true, true);
      
      table.foreign('content_section_id').references('id').inTable('blog_content_sections').onDelete('CASCADE');
      table.index('content_section_id');
      table.index('display_order');
      table.index('is_active');
    })
    
    // Consultation CTA Table
    .createTable('blog_consultation_cta', function(table) {
      table.increments('id').primary();
      table.string('title', 300).notNullable().comment('CTA title');
      table.text('description').notNullable().comment('CTA description');
      table.json('features').notNullable().comment('Array of feature strings');
      table.string('button_text', 200).notNullable().comment('Button text');
      table.string('image_url', 500).notNullable().comment('CTA image URL');
      table.boolean('is_active').defaultTo(true).comment('Whether the CTA is active');
      table.integer('display_order').defaultTo(1).comment('Display order');
      table.timestamps(true, true);
      
      table.index('is_active');
      table.index('display_order');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('blog_consultation_cta')
    .dropTableIfExists('blog_process_steps')
    .dropTableIfExists('blog_important_factors')
    .dropTableIfExists('blog_design_styles')
    .dropTableIfExists('blog_content_sections')
    .dropTableIfExists('blog_project_items')
    .dropTableIfExists('blog_hero_data');
}; 