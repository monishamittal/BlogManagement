const mongoose=require('mongoose');

const authorModel= new mongoose.Schema(
 { 
    fname: { 
        type:String,
        required:true,
    },
    lname: {mandatory},
     title:
      {mandatory,
     enum[Mr, Mrs, Miss]},
     email: {mandatory, valid email, unique},
      password: {mandatory}
 }
)