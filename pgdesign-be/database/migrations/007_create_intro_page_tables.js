exports.up = function(knex) {
  return knex.schema
    // About Intro Section
    .createTable('about_intro_data', function(table) {
      table.increments('id').primary();
      table.string('brand_title', 255).notNullable();
      table.string('brand_subtitle', 255).notNullable();
      table.string('identity', 255).notNullable();
      table.text('description_1').notNullable();
      table.text('description_2').notNullable();
      table.string('background_image_url', 500).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Vision Mission Section
    .createTable('vision_mission_data', function(table) {
      table.increments('id').primary();
      table.string('image_url', 500).notNullable();
      table.string('vision_title', 255).notNullable();
      table.text('vision_paragraph_1').notNullable();
      table.text('vision_paragraph_2').notNullable();
      table.string('mission_title', 255).notNullable();
      table.string('core_values_title', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Mission Items
    .createTable('mission_items', function(table) {
      table.increments('id').primary();
      table.integer('vision_mission_id').unsigned().references('id').inTable('vision_mission_data').onDelete('CASCADE');
      table.text('item_text').notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['vision_mission_id', 'display_order']);
    })
    
    // Core Values
    .createTable('core_values', function(table) {
      table.increments('id').primary();
      table.integer('vision_mission_id').unsigned().references('id').inTable('vision_mission_data').onDelete('CASCADE');
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['vision_mission_id', 'display_order']);
    })
    
    // Commitments Section
    .createTable('commitments_data', function(table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Commitment Items
    .createTable('commitment_items', function(table) {
      table.increments('id').primary();
      table.integer('commitments_id').unsigned().references('id').inTable('commitments_data').onDelete('CASCADE');
      table.string('icon_name', 100).notNullable();
      table.string('icon_url', 500).notNullable();
      table.string('title', 255).notNullable();
      table.text('description').notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['commitments_id', 'display_order']);
    })
    
    // Team Section
    .createTable('team_data', function(table) {
      table.increments('id').primary();
      table.string('heading', 255).notNullable();
      table.text('description').notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Board Directors
    .createTable('board_directors', function(table) {
      table.increments('id').primary();
      table.integer('team_id').unsigned().references('id').inTable('team_data').onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.string('title', 255).notNullable();
      table.string('image_url', 500).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['team_id', 'display_order']);
    })
    
    // Team Members
    .createTable('team_members', function(table) {
      table.increments('id').primary();
      table.integer('team_id').unsigned().references('id').inTable('team_data').onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.string('title', 255).notNullable();
      table.string('image_url', 500).notNullable();
      table.integer('display_order').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
      
      table.index(['team_id', 'display_order']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('team_members')
    .dropTableIfExists('board_directors')
    .dropTableIfExists('team_data')
    .dropTableIfExists('commitment_items')
    .dropTableIfExists('commitments_data')
    .dropTableIfExists('core_values')
    .dropTableIfExists('mission_items')
    .dropTableIfExists('vision_mission_data')
    .dropTableIfExists('about_intro_data');
}; 