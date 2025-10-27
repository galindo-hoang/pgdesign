/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // List of columns to add
  const columnsToAdd = [
    { name: 'slug', type: 'string', length: 500, comment: 'URL-friendly slug' },
    { name: 'excerpt', type: 'text', comment: 'Short excerpt from the content' },
    { name: 'html_content', type: 'text', comment: 'Full HTML content' },
    { name: 'thumbnail', type: 'string', length: 500, comment: 'Thumbnail image URL' },
    { name: 'metadata_images', type: 'text', comment: 'Metadata images JSON' },
    { name: 'hashtags', type: 'text', comment: 'Hashtags' },
    { name: 'read_time', type: 'string', length: 50, comment: 'Estimated reading time' },
    { name: 'category', type: 'string', length: 200, comment: 'Blog post category' },
    { name: 'subtitle', type: 'string', length: 500, comment: 'Blog post subtitle' },
    { name: 'seo_title', type: 'string', length: 500, comment: 'SEO title' },
    { name: 'seo_description', type: 'text', comment: 'SEO description' },
    { name: 'seo_keywords', type: 'text', comment: 'SEO keywords' }
  ];

  // Check which columns exist and add missing ones
  for (const col of columnsToAdd) {
    const exists = await knex.schema.hasColumn('blog_posts', col.name);
    if (!exists) {
      await knex.schema.alterTable('blog_posts', function(table) {
        if (col.type === 'text') {
          table.text(col.name).nullable().comment(col.comment);
        } else {
          table.string(col.name, col.length).nullable().comment(col.comment);
        }
      });
    }
  }

  // Add indexes
  const hasSlugIndex = await knex.schema.hasColumn('blog_posts', 'slug');
  if (hasSlugIndex) {
    try {
      await knex.schema.alterTable('blog_posts', function(table) {
        table.index('slug');
      });
    } catch (err) {
      // Index might already exist, ignore
      console.log('Index on slug might already exist');
    }
  }

  return;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('blog_posts', function(table) {
    table.dropIndex('slug');
    table.dropIndex('status');
    table.dropIndex('publish_date');
    table.dropColumn('slug');
    table.dropColumn('excerpt');
    table.dropColumn('html_content');
    table.dropColumn('thumbnail');
    table.dropColumn('metadata_images');
    table.dropColumn('hashtags');
    table.dropColumn('read_time');
    table.dropColumn('category');
    table.dropColumn('subtitle');
    table.dropColumn('seo_title');
    table.dropColumn('seo_description');
    table.dropColumn('seo_keywords');
  });
};

