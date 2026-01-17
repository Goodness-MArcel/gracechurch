const Sequelize = require('sequelize');
const { sequelize } = require('../src/lib/db-commonjs.js');
const userModel = require('./user.js');
const eventModel = require('./event.js');
const sermonModel = require('./sermon.js');

const db = {};

const user = userModel(sequelize, Sequelize.DataTypes);
db[user.name] = user;

const event = eventModel(sequelize, Sequelize.DataTypes);
db[event.name] = event;

const sermon = sermonModel(sequelize, Sequelize.DataTypes);
db[sermon.name] = sermon;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
