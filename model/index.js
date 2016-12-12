/**
 * Created by Administrator on 2016/12/1.
 */
var mongoose =require('./DB');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    phone:{type:Number},
    email:{type:String},
    pv: {type: Number, default: 0},

    filename:{type:String},
    creatime:{type : Date, default: Date.now}
});

module.exports = mongoose.model('t_users',UserSchema);


