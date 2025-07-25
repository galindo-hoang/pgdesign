/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  // Add more image slider data to have 5 slides as in the mock data
  const existingSlides = await knex('image_slider_data').count('* as count').first();
  
  if (existingSlides.count < 5) {
    // Get the current max display_order
    const maxOrder = await knex('image_slider_data')
      .max('display_order as max_order')
      .first();
    
    const startOrder = (maxOrder?.max_order || 0) + 1;
    
    // Add 2 more slides to match the mock data
    await knex('image_slider_data').insert([
      {
        image_url: 'http://localhost:9000/pgdesign-assets/images/thumb-intro.png',
        image_alt: 'DỰ ÁN MỚI 1',
        title: 'DỰ ÁN MỚI 1',
        subtitle: 'Thi công nội thất chung cư',
        size: '120m2',
        display_order: startOrder,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        image_url: 'http://localhost:9000/pgdesign-assets/images/diary-image-1.png',
        image_alt: 'DỰ ÁN MỚI 2',
        title: 'DỰ ÁN MỚI 2',
        subtitle: 'Thi công nội thất văn phòng',
        size: '300m2',
        display_order: startOrder + 1,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  }

  console.log('✅ Updated existing data and added missing slides successfully!');
}; 