const mongoose = require("mongoose")
//creation d'un shemat User
let userShemat = mongoose.Schema({
    //definitions des attributes 
    nom:{
        type:String,
        required:true
    },
    prenom:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }

})
//exportation du model user
module.exports =mongoose.model("User", userShemat) 