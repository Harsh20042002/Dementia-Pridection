const mongoose = require('mongoose');
const moment = require('moment-timezone');

const ReportsSchema = new mongoose.Schema({
    // like a foreign key in sql,
    // represents the association of this note to it's respective user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }, 
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => moment().tz('Asia/Kolkata').toDate()
    },  
    imageData: {
        type: String,
        required: true
    }, 
    result:{
        type: String,
    }   
});

module.exports = mongoose.model('reports', ReportsSchema)