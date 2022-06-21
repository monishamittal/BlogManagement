
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema( {
    title: {type:String,require:true}, 
    body:{type:String,require:true}, 
    authorId: {
        type: ObjectId,
        ref: "Author",
        require:true
    },
    tags: [{
        type: String
    }],
    category: {
        type: String,
        erequire:true,
    },
    subcategory : [{
        type: String
    }],
    deletedAt : {type:Date,default: Date.now },
    isDeleted : {type:Boolean,default:false},
    publishedAt : {type:Date,default: Date.now },
    isPublished : {type:Boolean,default:false},
    
}, { timestamps: true });


module.exports = mongoose.model('Blog', blogSchema)