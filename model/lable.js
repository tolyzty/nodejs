/**
 * Created by Administrator on 2016/12/9.
 */
var mongoose =require('./DB');

var Schema = mongoose.Schema;

var LableSchema = new Schema({
    lable_blogid:{type:String,ref: 't_blogs'},
    lable_userid:{type:String,default:''},
    lable_stut:{type:Number,default:1},
    lable_info:{type:Boolean,default:false},
    lable_time:{type : Date, default: Date.now}
});

module.exports = mongoose.model('t_lables',LableSchema,'t_lables');