exports.up = async function (knex) {
  // Capabilities
  await knex.schema.createTable("profile_capabilities", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("company_name").notNullable();
    table.string("service_line").notNullable();
    table.text("description").notNullable();
    table.json("capabilities").notNullable();
    table.string("main_image").notNullable().defaultTo("");
    table.json("side_images").notNullable();
    table.string("benefits_title").notNullable().defaultTo("");
    table.boolean("is_active").notNullable().defaultTo(true).unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // Construction process sections
  await knex.schema.createTable(
    "profile_construction_process_sections",
    (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.json("images").notNullable();
      table.string("layout_type").notNullable();
      table.integer("display_order").notNullable().defaultTo(0);
      table.boolean("is_active").notNullable().defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
  );

  // Technical advantages main
  await knex.schema.createTable("profile_technical_advantages", (table) => {
    table.increments("id").primary();
    table.string("main_title").notNullable();
    table.boolean("is_active").notNullable().defaultTo(true).unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  // Technical advantages phases
  await knex.schema.createTable(
    "profile_technical_advantage_phases",
    (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.json("images").notNullable();
      table.string("layout_type").notNullable();
      table.integer("display_order").notNullable().defaultTo(0);
      table.boolean("is_active").notNullable().defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    }
  );
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("profile_technical_advantage_phases");
  await knex.schema.dropTableIfExists("profile_technical_advantages");
  await knex.schema.dropTableIfExists("profile_construction_process_sections");
  await knex.schema.dropTableIfExists("profile_capabilities");
};
