const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    text:String,
    created:{
        type:Date,
        default:Date.now()
    },
    isRead:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('Message',messageSchema);