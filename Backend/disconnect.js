const mongoose = require('mongoose') // CommonJS
const mongoURI = 'mongodb://127.0.0.1:27017/Dementia'

const disconnectToMongo = async ()=>{
    try{
        await mongoose.disconnect(mongoURI)
        console.log("Disconnected from MongoDB")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = disconnectToMongo;