/**
 * Migration: Create project_image_blob_detail table
 * This table stores individual base64 images for projects in a normalized structure
 * Relationship: project_details (1) -> project_image_blob_detail (N)
 * 
 * Benefits:
 * - No JSON parsing issues
 * - Better performance for large images
 * - Individual image management
 * - Easier querying and filtering
 * - Support for image metadata (alt text, captions, etc.)
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  console.log('🔄 Creating project_image_blob_detail table...');

  await knex.schema.createTable('project_image_blob_detail', (table) => {
    // Primary key
    table.increments('id').primary().comment('Primary key');
    
    // Foreign key to project_details
    table.integer('project_detail_id').unsigned().notNullable()
      .comment('Foreign key reference to project_details.id');
    
    // Image data
    table.text('image_blob', 'longtext').notNullable()
      .comment('Base64 encoded image data with data URL format');
    
    // Image metadata
    table.string('alt_text', 500).nullable()
      .comment('Alt text for the image');
    
    table.string('caption', 1000).nullable()
      .comment('Image caption or description');
    
    table.string('image_type', 50).defaultTo('project')
      .comment('Type of image: project, thumbnail, gallery, etc.');
    
    // Display order
    table.integer('display_order').defaultTo(0)
      .comment('Order for displaying images');
    
    // Status
    table.boolean('is_active').defaultTo(true)
      .comment('Whether the image is active');
    
    // Timestamps
    table.timestamps(true, true);
    
    // Indexes
    table.index('project_detail_id', 'idx_project_image_blob_project_id');
    table.index('image_type', 'idx_project_image_blob_type');
    table.index('display_order', 'idx_project_image_blob_order');
    table.index('is_active', 'idx_project_image_blob_active');
    
    // Foreign key constraint
    table.foreign('project_detail_id')
      .references('id')
      .inTable('project_details')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  console.log('✅ Created project_image_blob_detail table with:');
  console.log('   • Normalized structure (1 image per row)');
  console.log('   • Foreign key to project_details');
  console.log('   • Image metadata support');
  console.log('   • Display order management');
  console.log('   • CASCADE delete/update');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  console.log('🔄 Dropping project_image_blob_detail table...');
  
  await knex.schema.dropTableIfExists('project_image_blob_detail');
  
  console.log('✅ Dropped project_image_blob_detail table');
};

