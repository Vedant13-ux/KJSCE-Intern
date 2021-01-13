const mongoose=require('mongoose');
const convSchema=new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    unread:{
        type:String
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
});
module.exports=mongoose.model('Conversation',convSchema)