/**
 * Migration: Add image_url field to service_page_process_sections table
 * This allows each process section to have a background image
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('service_page_process_sections', function(table) {
    table.string('image_url', 500).nullable().after('note').comment('Background image URL for the process section');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('service_page_process_sections', function(table) {
    table.dropColumn('image_url');
  });
}; 