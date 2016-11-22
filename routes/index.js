var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var middleware = require('../middleware/authenticate');
/* GET home page. */
router.get('/principal', middleware.authenticate, function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/',userController.loginView);
router.post('/',userController.login);
router.get('/registro',userController.registerView);
router.post('/registro',userController.register);
router.get('/logout',userController.logout);
module.exports = router;
