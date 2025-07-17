exports.up = function(knex) {
  return knex.schema
    .createTable('project_diary_data', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('project_diary_images', function(table) {
      table.increments('id').primary();
      table.integer('project_diary_id').unsigned().references('id').inTable('project_diary_data').onDelete('CASCADE');
      table.string('image_url', 500).notNullable();
      table.string('image_alt', 255).defaultTo('');
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['project_diary_id', 'display_order']);
    })
    .createTable('testimonial_header', function(table) {
      table.increments('id').primary();
      table.string('main_headline', 255).notNullable();
      table.string('sub_headline', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('testimonials', function(table) {
      table.increments('id').primary();
      table.integer('testimonial_header_id').unsigned().references('id').inTable('testimonial_header').onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.string('project', 255).notNullable();
      table.text('text').notNullable();
      table.string('avatar_url', 500).nullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['testimonial_header_id', 'display_order']);
    })
    .createTable('consultation_form_data', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.integer('min_investment').notNullable();
      table.integer('max_investment').notNullable();
      table.integer('step_investment').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    .createTable('project_types', function(table) {
      table.increments('id').primary();
      table.integer('consultation_form_id').unsigned().references('id').inTable('consultation_form_data').onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['consultation_form_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_types')
    .dropTableIfExists('consultation_form_data')
    .dropTableIfExists('testimonials')
    .dropTableIfExists('testimonial_header')
    .dropTableIfExists('project_diary_images')
    .dropTableIfExists('project_diary_data');
}; 