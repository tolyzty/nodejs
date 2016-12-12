/**
 * Created by Administrator on 2016/12/1.
 */
var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/test';
mongoose.connect(DB_URL);

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('====================================================');
    console.log('数据库连接成功 地址： ' + DB_URL);
    console.log('====================================================');
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});


module.exports = mongoose;