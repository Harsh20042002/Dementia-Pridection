const connectToMongo = require('./connection');
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser');

const disconnect = require('./disconnect')

connectToMongo();
const app = express() 
const port = 4000

app.use(cors())

const storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null, "reports");
  },
  filename: function(req,file,cb){
      cb(null,file.originalname);``
  }
});
//reference from multer github repo
const upload = multer({storage});

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// This middleware is used to handle and process JSON data sent by clients, such as data submitted in the request body of a POST or PUT request 
app.use(express.json())



app.use('/api/auth', require('./routes/auth'))
app.use('/api/report',require('./routes/report'))

app.listen(port, () => {
  console.log(`Dementia backend listening on port ${port}`)
})

