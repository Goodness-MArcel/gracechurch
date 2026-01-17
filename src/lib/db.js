import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Force Postgres driver dependencies to be included in server bundles (Vercel/Turbopack).
// Sequelize dynamically requires these, which can be missed by output tracing.
require('pg');
require('pg-hstore');

const { sequelize, connectDB, disconnectDB } = require('./db-commonjs.js');
const db = require('../../models');

export { sequelize, connectDB, disconnectDB, db };