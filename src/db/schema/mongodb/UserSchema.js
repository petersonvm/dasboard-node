const Mongoose =  require('mongoose');

const UserSchema = new Mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique : true
    },
    password: {
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
});

module.exports = Mongoose.models.user || Mongoose.model('user', UserSchema)