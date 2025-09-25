/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('consultation_requests', function(table) {
    table.increments('id').primary();
    table.string('full_name', 255).notNullable().comment('Họ và tên khách hàng');
    table.string('phone_number', 20).notNullable().comment('Số điện thoại khách hàng');
    table.string('email', 255).notNullable().comment('Email khách hàng');
    table.text('address').notNullable().comment('Địa chỉ khách hàng');
    table.string('project_type', 255).notNullable().comment('Loại công trình');
    table.string('investment_level', 100).notNullable().comment('Mức đầu tư');
    table.text('specific_request').nullable().comment('Yêu cầu cụ thể');
    table.enum('status', ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'])
         .defaultTo('pending')
         .comment('Trạng thái xử lý yêu cầu');
    table.text('admin_notes').nullable().comment('Ghi chú của admin');
    table.timestamp('contacted_at').nullable().comment('Thời gian liên hệ khách hàng');
    table.timestamps(true, true);
    
    // Indexes for better performance
    table.index('status');
    table.index('created_at');
    table.index('email');
    table.index('phone_number');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('consultation_requests');
};
