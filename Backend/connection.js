const mongoose = require('mongoose') // CommonJS
const mongoURI = 'mongodb://127.0.0.1:27017/DementiaDatabase'

const connectToMongo = async ()=>{
    try{
        await mongoose.connect(mongoURI)
        console.log('connected to mongoDB')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectToMongo;