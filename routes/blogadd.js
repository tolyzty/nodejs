/**
 * Created by Administrator on 2016/12/8.
 */
var express = require('express');
var router = express.Router();
var MyBlog = require('../model/blog');
var Lable =require('../model/lable');
router.get('/',function (req,res) {
    if(req.session.user){
        res.render('blogadd',{title:'新增博客信息'});
    }else{
        res.redirect('/login');
    }

});


router.post('/',function (req,res) {
    var userid = req.session.user._id;
    var username= req.session.user.username;
    var doc = {
        blog_userid:userid,
        blog_username:username,
        blog_title:req.body.blog_title,
        blog_abstract:req.body.blog_abstract,
        blog_keyword:req.body.blog_keyword,
        blog_content:req.body.blog_content,
        blog_time:new Date(),
    };

    MyBlog.create(doc,function (err,doc) {
        var href= "点击查看";
        if(doc){
            Lable.create({lable_blogid:doc._id},function (err,doc) {
                if(doc){
                    res.redirect('/');
                }else{
                    res.send(500);
                    console.log(err);
                }
            })

        }else{
            res.send(500);
            console.log(err);
        }
    }) ;
});

module.exports = router;