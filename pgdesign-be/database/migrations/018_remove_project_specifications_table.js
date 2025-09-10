/**
 * Migration to remove project_specifications table
 * Since projectSpecs functionality is being removed, we drop the entire table
 */
exports.up = function(knex) {
  return knex.schema.dropTableIfExists('project_specifications');
};

exports.down = function(knex) {
  return knex.schema.createTable('project_specifications', function(table) {
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