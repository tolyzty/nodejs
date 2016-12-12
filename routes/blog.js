/**
 * Created by Administrator on 2016/12/5.
 */
var express = require('express');
var router = express.Router();
var Blog = require('../model/blog');

/*
router.get('/',function (req,res) {
    if(req.session.user){
        res.render('blogadd',{title:'新增博客信息'});
    }else{
        res.redirect('/login');
    }

});
*/

router.get('/',function (req,res) {
   Blog.find({},function (err,docs) {
       res.render('blogall',{title:'博客全部文章',blog:docs});
   });

});


/*blog_userid:{type:String},
blog_title:{type:String},
blog_abstract:{type:String},
blog_content:{type:String},
blog_keyword:{type:String},
blog_pv:{type:Number,default:0},
blog_follow:{type:Number,default:0},
blog_time:{type:Date},
blog_zt:{type:String}*/
/*var blogtitle = $('#blog_title');
var blogabstract = $('#blog_abstract');
var blogkeyword = $('#blog_keyword');
var blogcontent = $('#blog_content');*/





module.exports = router;
