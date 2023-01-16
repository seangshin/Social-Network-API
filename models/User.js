const mongoose = require('mongoose');
const validator = require('validator');

//Create a new instance of the Mongoose scehma to define shape of each document
const userSchema = new mongoose.Schema({

  //Add individual properties and their types
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true,
    //Add validate property to use the validator npm to check if email is valid
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email.'
    }
  },
  //an arrary of 'ObjectId' values that reference a model for thoughts and friends
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Friend'
  }],
  //Use built-in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

//a virtual - a property of a schema that can be used to define a computed value based 
//on other properties - which retrieves the length of the user's friends on query
userSchema.virtual('friendCount').get(function() {
  return friends.length;
});

//Use the 'pre' middleware to remove associated thoughts when a user is removed
// userSchema.pre('remove', async function(next) {
//   await Thought.deleteMany({ user: this._id });
//   next();
// });

//Using mongoose.model() to create a new MongoDB collection
//and allows you to interact with is using the 'User' model
const User = mongoose.model('User', userSchema);

module.exports = User;