const mongoose =require("mongoose")

const Schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:20,
        unique:true
    }
},{timestamps:true}

)

module.exports= mongoose.model("User", Schema)