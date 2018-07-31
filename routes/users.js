var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: '登陆' });
});

router.post('/login.do', function(req, res, next) {
    console.info(req);
    res.send(req.body.username+'用户名或密码错误');
});

module.exports = router;
