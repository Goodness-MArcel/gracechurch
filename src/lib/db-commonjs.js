const { Sequelize } = require('sequelize');
require('dotenv').config({ path: '.env.local' });
const pg = require('pg');

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
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
  : null;

const connectDB = async () => {
  if (!sequelize) {
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