#!/usr/bin/env node

// Script to analyze database tables with blob/image data
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile');

// Database configuration
const db = knex(knexConfig.development);

async function analyzeBlobTables() {
  try {
    console.log('🔍 Analyzing database tables with blob/image data...\n');

    // Get all tables
    const tables = await db.raw('SHOW TABLES');
    const tableNames = tables[0].map(row => Object.values(row)[0]);
    
    console.log('📊 All tables:');
    tableNames.forEach(table => console.log(`  - ${table}`));
    console.log('');

    // Find tables with blob/image related columns
    const blobTables = [];
    
    for (const tableName of tableNames) {
      const columns = await db.raw(`DESCRIBE ${tableName}`);
      const blobColumns = columns[0].filter(col => 
        col.Type.includes('blob') || 
        col.Type.includes('text') ||
        col.Field.includes('blob') ||
        col.Field.includes('image') ||
        col.Field.includes('background')
      );
      
      if (blobColumns.length > 0) {
        blobTables.push({
          table: tableName,
          columns: blobColumns
        });
      }
    }

    console.log('🎯 Tables with blob/image data:');
    blobTables.forEach(({ table, columns }) => {
      console.log(`\n📋 Table: ${table}`);
      columns.forEach(col => {
        console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'YES' ? '(nullable)' : '(required)'}`);
      });
    });

    // Analyze data in each blob table
    console.log('\n📈 Data Analysis:');
    for (const { table, columns } of blobTables) {
      console.log(`\n🔍 Analyzing table: ${table}`);
      
      const totalRows = await db(table).count('* as count').first();
      console.log(`  Total rows: ${totalRows.count}`);
      
      for (const col of columns) {
        const nonNullCount = await db(table)
          .whereNotNull(col.Field)
          .count('* as count')
          .first();
        
        console.log(`  ${col.Field}: ${nonNullCount.count} non-null values`);
        
        // Sample data for blob columns
        if (col.Type.includes('blob') || col.Type.includes('text')) {
          const sample = await db(table)
            .select(col.Field)
            .whereNotNull(col.Field)
            .limit(1)
            .first();
          
          if (sample && sample[col.Field]) {
            const value = sample[col.Field];
            if (typeof value === 'string') {
              if (value.startsWith('data:image/')) {
                console.log(`    Sample: Base64 image (${value.length} chars)`);
              } else if (value.startsWith('http')) {
                console.log(`    Sample: URL (${value})`);
              } else {
                console.log(`    Sample: Text (${value.substring(0, 50)}...)`);
              }
            }
          }
        }
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await db.destroy();
  }
}

analyzeBlobTables();
