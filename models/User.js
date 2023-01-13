const mongoose = require('mongoose');

//Create a new instance of the Mongoose scehma to define shape of each document
const userSchema = new mongoose.Schema({

  //Add individual properties and their types
  username: { type: String, required: true },
  //Use built-in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

//Using mongoose.model() to compile a model based on the schema
const User = mongoose.model('User', userSchema);

//Error handler function for errors when trying to save a document
const handleError = (err) => console.error(err);

//create an individual document that have the properties as defined in the schema
User.create(
  {
    username: "seangshin",
  },
  (err) => (err ? handleError(err) : console.log('Created new document'))
);

module.exports = User;