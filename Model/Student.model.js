const mongoose=require("mongoose")


const StudentSchema=new mongoose.Schema({
name:{type:String,require:true},
marks:{type:Number,require:true},
subject:{type:String,require:true},
date:{type:String,require:true},
userid:String,
completed:{type:String,default:false}
})

const StudentModel=mongoose.model("studentData",StudentSchema)

module.exports=StudentModel