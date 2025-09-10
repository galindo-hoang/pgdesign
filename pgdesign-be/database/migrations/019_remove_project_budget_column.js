/**
 * Migration to remove project_budget column from project_details table
 * Since budget information is now combined into project_status field
 */
exports.up = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    table.dropColumn('project_budget');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('project_details', function(table) {
    table.string('project_budget', 100).nullable().comment('Project budget');
  });
}; 