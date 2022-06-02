const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hide : {
        type : Array,
        default : []
    },
    remind : {
        type : Array,
        default : []
    },
    actions : {
        type: [
            {
                id : Number,
                lc : String,
            }
        ]
    },
    interests : {
        type : Array,
        default :[]
    },
    difficulty : {
        type : Number,
        default : 2,
    },
    effort : {
        type : Number,
        default : 100,
    }
});


module.exports.userSchema = mongoose.model('User', userSchema);