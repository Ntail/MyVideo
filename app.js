var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var video = require('./routes/video');

var app = express();

// 拦截器 过滤所有请求 验证用户是否登录
// 所有用户可以访问index.html, error.html
// admin可以访问admin.html, /getData
// 登陆用户可以访问home.html
app.all('/*', function(request, res, next){
  // 思路：
  // 得到请求的url
  // 然后得到request的cookie，根据cookie得到当前登陆的用户
  // 判断用户对应url的权限
  var jsPattern=/\.js$/;
  var url=request.originalUrl;
  if(jsPattern.test(url)){
  // 公共部分，放行
      next();
      return;
  }
  if(url.indexOf('index')>-1 || url.indexOf('error')>-1 || url.index('login')>-1){
      next();
      return;
  }
  var cookie=JSON.stringify(request.cookies);
  if(cookie){
      next();
  }else{
      res.render('login');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/video', video);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
