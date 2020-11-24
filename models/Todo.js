const mongoose =require('mongoose');

const TodoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    client:{
        type:String,
        required:true
    },
    members:{
        type:Array,
        required:true
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    progress:{
        type:String,
        required:true
    },
    group:{
        type:String
        
    }

});
  

module.exports=mongoose.model('Todo',TodoSchema);
