//import mongoose
const mongoose = require('mongoose');

//creates an instance connection to a MongoDB using local host and database collection
mongoose.connect('mongodb://127.0.0.1:27017/sandboxDB', { useNewUrlParser: true, useUnifiedTopology: true, })

//export connection
module.exports = mongoose.connection;