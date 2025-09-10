/**
 * Migration to remove icon_url columns from all tables
 * Since icons will be static SVGs, we don't need to store URLs in the database
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable('stats_items', function(table) {
      table.dropColumn('icon_url');
    })
    .alterTable('workflow_tabs', function(table) {
      table.dropColumn('icon_url');
    })
    .alterTable('commitment_items', function(table) {
      table.dropColumn('icon_url');
    });
};

exports.down = function(knex) {
  return knex.schema
    .alterTable('stats_items', function(table) {
      table.string('icon_url', 500).notNullable();
    })
    .alterTable('workflow_tabs', function(table) {
      table.string('icon_url', 500).notNullable();
    })
    .alterTable('commitment_items', function(table) {
      table.string('icon_url', 500).notNullable();
    });
}; 