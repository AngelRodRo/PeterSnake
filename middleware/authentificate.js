
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
module.exports.authenticate = function (req,res,next) {
  var token = req.session.token;

  jwt.verify(token, config.secret ,function (err,decoded) {
    if(err) return res.send(401);
    next();
  })
}
