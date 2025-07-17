/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Set first 5 projects to appear on homepage
  await knex('project_details')
    .whereIn('id', [1, 2, 3, 4, 5])
    .update({ is_on_homepage: true });

  console.log('✅ Set 5 projects to appear on homepage');
}; 