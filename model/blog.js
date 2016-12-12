/**
 * Created by Administrator on 2016/12/6.
 */
var mongoose =require('./DB');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
      blog_userid:{type:String},
      blog_username:{type:String},
      blog_title:{type:String},
      blog_abstract:{type:String},
      blog_content:{type:String},
      blog_keyword:{type:String},
      blog_pv:{type:Number,default:0},
      blog_follow:{type:Number,default:0},
      blog_time:{type:Date},
      blog_zt:{type:Number,default:0}
});

module.exports = mongoose.model('t_blogs',BlogSchema,'t_blogs');