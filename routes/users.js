var express = require('express');
var router = express.Router();
var User = require('../model/index');



/*
var Entiy = new User({
    username:'cccc',
    password:'cccc',
  filename:'cccc.jpg',
  creatime:new Date()
});
Entiy.save(function (err) {
   if(!err){
       console.log('success save');
   }else{
       console.log('failed save');
   }
});
*/


/*
User.find({},function (err,docs) {
  console.log(docs);
});
*/


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users',{title:'useryemian'});

});

module.exports = router;
