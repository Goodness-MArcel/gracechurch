import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { sequelize, connectDB, disconnectDB } = require('./db-commonjs.js');
const db = require('../../models');

export { sequelize, connectDB, disconnectDB, db };