const mongoose =require('mongoose');
const internshipDetailsSchema=new mongoose.Schema ({
  faculty:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  skillsRequired:String,
  duration:String,
  apply_by:Date,
  posted_on:{
      type:Date,
      default:Date.now()
  },
  numberOpenings:Number,
  otherRequirements:String,
  department:String,
  perks:String,
  whoCanApply:String,
  applicants:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  }]
});

module.exports=mongoose.model('InternshipDetails',internshipDetailsSchema);