const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env.local' });

// Prefer DATABASE_URL, but support Vercel Postgres env names
const connectionString = process.env.DATABASE_URL
  || process.env.POSTGRES_URL
  || process.env.POSTGRES_PRISMA_URL;

const hasConnectionString = Boolean(connectionString);

// IMPORTANT:
// - Next/Vercel evaluates route modules at build time ("Collecting page data").
// - When env vars are missing, we still need a Sequelize instance so model imports don't crash.
// - Do NOT use sqlite fallback here (it requires the native `sqlite3` package on Vercel).
// - Instead, create a Postgres-dialect stub that doesn't connect unless used.
const sequelize = hasConnectionString
  ? new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 1, // Very conservative for Aiven free tier
        min: 0,
        acquire: 30000,
        idle: 5000, // Shorter idle time
        evict: 30000, // More aggressive eviction
        handleDisconnects: true
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      retry: {
        max: 3, // Retry failed connections up to 3 times
        backoffBase: 100, // Initial backoff delay in ms
        backoffExponent: 1.5 // Exponential backoff multiplier
      }
    })
  : new Sequelize('postgres', 'postgres', 'postgres', {
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
      logging: false
    });

const connectDB = async () => {
  if (!hasConnectionString) {
    throw new Error('DATABASE_URL not configured');
  }

  try {
    console.log('Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    // Log connection pool status
    const pool = sequelize.connectionManager.pool;
    console.log(`📊 Connection pool status - Size: ${pool.size}, Available: ${pool.available}, Pending: ${pool.pending}, Borrowed: ${pool.borrowed}`);

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);

    // If it's a connection pool exhausted error, try to close existing connections
    if (error.code === '53300' || error.message.includes('remaining connection slots')) {
      console.log('🔄 Connection pool exhausted, attempting to cleanup...');
      try {
        await sequelize.close();
        console.log('🧹 Existing connections closed, please try again.');
      } catch (closeError) {
        console.error('❌ Error closing connections:', closeError.message);
      }
    }

    throw error;
  }
};

const disconnectDB = async () => {
  if (sequelize) {
    try {
      await sequelize.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
};

module.exports = { sequelize, connectDB, disconnectDB };