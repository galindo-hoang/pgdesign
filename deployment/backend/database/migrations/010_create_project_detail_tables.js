/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('project_details', function(table) {
      table.increments('id').primary();
      table.string('project_id', 100).notNullable().unique().comment('Unique identifier for the project');
      table.string('title', 300).notNullable().comment('Project title');
      table.string('client_name', 200).notNullable().comment('Client name');
      table.string('area', 50).notNullable().comment('Project area');
      table.date('construction_date').notNullable().comment('Construction start date');
      table.string('address', 500).notNullable().comment('Project address');
      table.text('description').nullable().comment('Project description');
      table.string('category', 100).notNullable().comment('Project category');
      table.string('sub_category', 100).notNullable().comment('Project sub category');
      table.string('style', 100).nullable().comment('Project style');
      table.string('thumbnail_image', 500).nullable().comment('Thumbnail image URL');
      
      // Embedded HTML content
      table.text('html_content', 'longtext').notNullable().comment('HTML content for project detail page');
      
      // Additional project details
      table.json('project_images').nullable().comment('Array of project image URLs');
      table.string('project_status', 100).nullable().comment('Project status');
      table.string('project_budget', 100).nullable().comment('Project budget');
      table.date('completion_date').nullable().comment('Project completion date');
      table.string('architect_name', 200).nullable().comment('Architect name');
      table.string('contractor_name', 200).nullable().comment('Contractor name');
      
      // SEO and metadata
      table.string('meta_title', 300).nullable().comment('SEO meta title');
      table.text('meta_description').nullable().comment('SEO meta description');
      table.json('tags').nullable().comment('Array of project tags');
      
      // Admin fields
      table.boolean('is_active').defaultTo(true).comment('Whether the project is active');
      table.timestamps(true, true);
      
      // Indexes
      table.index('project_id');
      table.index('category');
      table.index('sub_category');
      table.index('is_active');
    })
    .createTable('project_specifications', function(table) {
      table.increments('id').primary();
      table.integer('project_detail_id').unsigned().notNullable().comment('Reference to project_details table');
      table.string('label', 200).notNullable().comment('Specification label');
      table.string('value', 100).notNullable().comment('Specification value');
      table.string('unit', 50).nullable().comment('Unit of measurement');
      table.integer('display_order').defaultTo(0).comment('Display order');
      table.boolean('is_active').defaultTo(true).comment('Whether the specification is active');
      table.timestamps(true, true);
      
      // Foreign key constraint
      table.foreign('project_detail_id').references('id').inTable('project_details').onDelete('CASCADE');
      
      // Indexes
      table.index('project_detail_id');
      table.index('display_order');
      table.index('is_active');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_specifications')
    .dropTableIfExists('project_details');
}; 