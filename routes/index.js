var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var middleware = require('../middleware/authenticate');
/* GET home page. */
// router.get('/principal', middleware.authenticate, function(req, res) {
//   res.render('snake_secuencial');
// });
router.get('/principal',userController.principal);
router.get('/',userController.loginView);
router.post('/',userController.login);
router.get('/registro',userController.registerView);
router.post('/registro',userController.register);
router.get('/logout',userController.logout);
//router.get('/snake_secuencial',userController.snake);
router.get('/snake_secuencial2',userController.snake_s2);
router.get('/snake_repetitivo',userController.snake_r1);
router.get('/snake_repetitivo2',userController.snake_r2);
router.get('/snake_condicional',userController.snake_c1);
router.get('/snake_condicional2',userController.snake_c2);
module.exports = router;
