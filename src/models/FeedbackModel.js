const {mongoose,model} = require("mongoose");
const Schema = mongoose.Schema;



const FeedbackSchema=new Schema({
    clientName:{type:String,required:true},
    designation:{type:String,required:true},
    company:{type:String,required:true},
    comment:{type:String,required:true},
    systemCapacity:{type:Number,required:true},
    systemType:{type:String,required:true},
    location:{type:String,required:true},
    annual_energy_generation:{type:Number,required:true},
    annual_savings:{type:Number,required:true},
});

const FeedbackModel=model("feedback",FeedbackSchema);
module.exports=FeedbackModel;