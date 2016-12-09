var models = require('../models');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
module.exports.login = function (req,res) {
  var params = req.body;
  var opts = {
    where:{
      email:params.email,
      password:params.password
    }
  }

  models.User.findOne(opts).then(function (user) {
    if(!user) return res.sendStatus(401);
    var token = jwt.sign(user.dataValues,config.secret,{
      expiresIn : 60*60*24
    });
    req.session.token = token;
    return res.redirect('/principal');
  })
}

module.exports.register = function (req,res) {
  var params = req.body;
  models.User.create({
    name:params.name,
    lastname: params.lastname,
    email: params.email,
    password: params.password,
    gender: params.gender,
    age: params.age
  }).then(function (user) {
    return res.redirect('/');
  })

  .catch(function (err) {
    console.log(err);
    return res.send(503);
  })
}

module.exports.logout = function (req,res) {
  req.session.token = "";
}

module.exports.loginView = function (req,res) {
  return res.render('login');
}

module.exports.registerView = function (req,res) {
  return res.render('register');
}
