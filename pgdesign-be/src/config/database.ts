import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 20, // Increased from 10 to 20
    acquireTimeoutMillis: 60000, // Increased from 30000 to 60000
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false,
    // Add connection validation
    validate: (connection: any) => {
      return connection && !connection._knexDestroyed;
    },
    // Add connection acquire retry logic
    afterCreate: (connection: any, done: any) => {
      connection.query('SET SESSION sql_mode = "TRADITIONAL"');
      done(null, connection);
    }
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  },
  useNullAsDefault: true,
  debug: process.env.NODE_ENV === 'development'
};

const db = knex(config);

// Add connection pool monitoring
export const getPoolStatus = () => {
  const pool = db.client.pool;
  return {
    used: pool.numUsed(),
    free: pool.numFree(),
    pendingAcquires: pool.numPendingAcquires(),
    pendingCreates: pool.numPendingCreates(),
    total: pool.numUsed() + pool.numFree()
  };
};

// Log pool status periodically in development
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    const status = getPoolStatus();
    if (status.used > 0 || status.pendingAcquires > 0) {
      console.log('🔍 Connection Pool Status:', status);
    }
  }, 30000); // Every 30 seconds
}

// Test the database connection
export const testConnection = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful');
    console.log('🔍 Initial Pool Status:', getPoolStatus());
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Health check function for connection pool
export const healthCheck = async (): Promise<{ healthy: boolean; status: any; error?: string }> => {
  try {
    const startTime = Date.now();
    await db.raw('SELECT 1');
    const responseTime = Date.now() - startTime;
    
    const poolStatus = getPoolStatus();
    
    return {
      healthy: true,
      status: {
        ...poolStatus,
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    return {
      healthy: false,
      status: getPoolStatus(),
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Graceful shutdown function
export const gracefulShutdown = async (): Promise<void> => {
  try {
    console.log('🔄 Gracefully shutting down database connections...');
    await db.destroy();
    console.log('✅ Database connections closed successfully');
  } catch (error) {
    console.error('❌ Error during database shutdown:', error);
  }
};

export default db; 