var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: '欢迎登陆' });
});

router.post('/login.do', function(req, res, next) {
    
    var info = {
        state:-1,
        message:""
    };
    if(req.body.lname == "miss" && req.body.lwd == "123456li"){
        req.session.sign = true;
        req.session.name = "miss";
        info.state = 1;
    }else{
        info.message = "用户名或密码错误";
    }
    res.json(info);
});

module.exports = router;
