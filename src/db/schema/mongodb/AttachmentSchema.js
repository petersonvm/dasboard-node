const Mongoose =  require('mongoose');

const AttachmentSchema = new Mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
})

module.exports = AttachmentSchema