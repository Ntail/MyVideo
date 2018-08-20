var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是node.j标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 播放相应视频
router.get('/videoplay', function(req, res, next) {
    // 在后面加上?rel=0&amp;autoplay=1使视频自动播放
    res.render('videoplay', { title: '视频', videodata:"http://000o.cc/jx/ty.php?url=" + req.query.url +"?rel=0&amp;autoplay=1"});
});

/* 获取数据*/
router.get('/videolist', function(req, res, next) {
    var url = "www.iqiyi.com/dianying";
    var videodataModel = [];
    superagent.get(url).end(function(err,sres){
        if(err){
            return console.log(err);
        }
        var topicUrls = []; // 装入所有的 URL
        
        var $ = cheerio.load(sres.text);
        // 获取首页所有的链接
        var list = $('.qy-mod-link-wrap').find('a');
        list.each(function(index,item){
            var model = {};
            model.name = item.attribs.title;
            model.url = item.attribs.href;
            // 检查数据是否存在
            var isTrue = false;
            for(var i=0;i<videodataModel.length;i++){
                if(model.name == videodataModel[i].name && model.url == videodataModel[i].url){
                    isTrue = true;
                }
            }
            if(!isTrue){
                videodataModel.push(model);
            }
        });
        res.render('video', { title: '视频', videodata:videodataModel});
    });
});

module.exports = router;
