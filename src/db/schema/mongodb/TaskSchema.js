const Mongoose =  require('mongoose');

const TaskSchema = new Mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    detail: {
        type: String
    },
    attachment: [{
        type: AttachmentSchema
    }],
    tags: [{
        type: String
    }],
    isCompleted:{
        type: Boolean,
        default: false
    },
    dateTime: {
        type: Date,
    },
    ownerId:{
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
    },
});

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
module.exports = Mongoose.models.task || Mongoose.model('task', TaskSchema)