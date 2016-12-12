var express = require('express');
var router = express.Router();
var User = require('../model/index');
var Blog =require('../model/blog');
var Lable = require('../model/lable');
/* GET home page. */


router.get('/',function (req,res) {
    res.render('index',{title:'首页'});
  /*  if(!req.session.user){
        res.render('index',{title:'首页'})
    }else{
       /!* res.render('index',{title:'首页',username:req.session.name})*!/
    }*/
/*    if(req.session.sign){
        console.log(req.session);
        res.render('index',{title:'首页',username:req.session.user.username})
        sess = req.session.user.username;
    }else{
        req.session.sign = true;
        req.session.name = '';

        sessk = req.session.name;
        console.log(req.session.name);
    }*/

});

/**
 * login.get访问页面login跳转,req.session.error==''重置页面错误信息默认为空；
 * title:头信息,后面可以跟其他信息
 * login.post提交表单,获取username,password，findOne根据用户名和密码查询，如果内容存在
 * 放到seseion里面,返回页面200 = 'success'  404 = 'error'
 *
 */
router.get('/login',function (req,res) {
    req.session.error= '';
    res.render('login',{title:'登录页面'});
});

router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var docc = {
        username:username,
        password:password
    };
    User.findOne(docc,function (err,doc) {
        if(doc){
            req.session.user = doc;
            res.redirect('/home');
        }else{
            req.session.error = '对不起用户名和密码不正确';
            res.redirect('/login');
        }
    });
});


router.get('/regist',function (req,res) {
     req.session.error= '';
    res.render('regist',{title:'注册页面'});
});


router.post('/regist',function (req,res) {
    var name = req.body.reusername;
    var password = req.body.repassword;
    var phone = req.body.rephone;
    var email = req.body.reemail;
    var doct = {username:name,password:password,phone:phone,email:email};
    User.findOne({username:req.body.reusername},function (err,doc) {
        if(doc){
            req.session.error = '用户名已存在,请重试';
            res.redirect('/regist');
        }else if(err){
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else{
            User.create(doct,function (err,doc) {
                var href = '请登录';
                if(doc){
                    req.session.error = '恭喜您注册成功'+'<a href="login">'+href+'</a>';
                    res.redirect('/regist');
                }else{
                    res.send(500);
                    console.log(err);
                }
            })
        }
    });
});

router.get('/home',function (req,res) {
    if(!req.session.user){
        res.redirect('/login');
    }else{
        var uid = req.session.user._id;
        Blog.find({blog_userid:uid},function (err,docs) {
            res.render('home',{title:'个人中心页面',blog:docs});
        });

    }
});

/*
 Blog.find({}).populate('lable_blogid').exec(function(err,docs){

 })
 */
router.get('/blogfind/:id',function (req,res) {
    var usid = '';
    if(req.session.user){
        usid = req.session.user._id;
    }else{

    }
    var bloid = req.params.id;
    Blog.findOne({_id:bloid},function (err,doc) {
        if(doc){
            var dodoc = doc;
            Blog.update({_id:bloid},{$inc:{blog_pv:1}},function (err,doc) {
                if (!err){
                    res.render('blogfind',{title:'文章详细页面',blogone:dodoc,usid:usid});
                }else{
                    res.send( 500);
                    console.log(err);
                }
            })
        } else{
            res.send( 500);
            console.log(err);
        }
    });

});

router.post('/follow',function (req,res) {
    var ssuid = req.session.user._id;
    var bloid = req.body.lable_blogid;
    var  data = {lable_blogid:bloid,
        lable_userid:ssuid
    };
    var url = 'blogfind/'+bloid+'';
    Lable.findOne(data,{_id:0,lable_blogid:0,lable_userid:0,lable_time:0},function (err,doc) {
        if(!err){
            res.send(200,doc);
        } else{
            res.send(404);
            console.log(err);
        }
    });

});
router.post('/clickfollow',function (req,res) {
    var blogid = req.body.lable_blogid;
    if(req.session.user){
        var data ={
            lable_blogid:req.body.lable_blogid
        };
        console.log(data);
        Lable.update(data,{$set:{lable_info:true,lable_userid:req.session.user._id}},function (err,doc) {
            if(!err){
                updatefollow(blogid,res);
            }else{
                res.send(500);
                console.log(err);
            }
        });
    }else{
        res.redirect('/login');
    }

});

function updatefollow(blogid,res) {
    Blog.update({_id:blogid},{$inc:{blog_follow:1}},function (err,doc) {
         if(!err){
             res.send(200);
         } else{
             res.send(500);
             console.log(err);
         }
    });
}



router.get('/logout',function (req,res) {
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
