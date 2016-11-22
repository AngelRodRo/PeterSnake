"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config    = require('../config/config.json')
//var config    = require('../config/configv2')
//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password,{
dialect: config.postgres.dialect,
host:config.postgres.host,
define:{
  timestamps:false,
  freezeTableName:true
},
pool: {
  max: 5,
  min: 0,
  idle: 10000
},
})

var db = {};

fs
.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});


Object.keys(db).forEach(function(modelName) {
if ("associate" in db[modelName]) {
  db[modelName].associate(db);
}
});


sequelize.sync().then(function() {
return console.log("CONNECTION TO MYSQL SUPERFUL");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
