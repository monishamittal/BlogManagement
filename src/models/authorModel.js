const mongoose=require('mongoose');

const authorModel= new mongoose.Schema(
 { 
    fname: { 
        type:String,
        required:true,
    },
    lname: {
        type:String,
        required:true,
    },
     title:{
        required:true,
        enum:[Mr, Mrs, Miss]
    },
     email: {
        type:String,
        required:true,
        validate: [validateEmail, 'please fill a validate email address'],
        lowercase:true,
        unique:true
    },
      password: {
        required:true
      }
 }
)
module.exports = mongoose.model('Author', authorSchema)