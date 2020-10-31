const mongoose =require('mongoose');
const updatesSchema=new mongoose.Schema ({
  files:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'File'
  }],
  author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
  remark:String,
  isGood:Boolean
});

module.exports=mongoose.model('Update',updatesSchema)