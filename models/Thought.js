const mongoose = require('mongoose');

//Child document or subdocuments embedded into parent document 
const reactionSchema = new mongoose.Schema({
  //Add individual properties and their types
  reactionId: { type: mongoose.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },

  //Use built-in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

//Create a new instance of the Mongoose scehma to define shape of each document
const thoughtSchema = new mongoose.Schema({
  //Add individual properties and their types
  //String, required, must be between 1 and 280 characters
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  //Use built-in date method to get current date
  createdAt: { type: Date, default: Date.now },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reactions: [reactionSchema],
  //Use built-in date method to get current date
  lastAccessed: { type: Date, default: Date.now },
});

//pre middleware for adding the associated user id to the thought
thoughtSchema.pre('save', async function(next) {
  const userData = await mongoose.model('User').findById(this.username);
  userData.thoughts.push(this._id);
  await userData.save();
  next();
});

//a virtual - a property of a schema that can be used to define a computed value based 
//on other properties - which retrieves the length of the user's friends on query
thoughtSchema.virtual('reactionCount').get(function() {
  return reactions.length;
});

//Using mongoose.model() to create a new MongoDB collection
//and allows you to interact with is using the 'User' model
const Thought = mongoose.model('Thought', thoughtSchema);

//*******Below code creates a document***** */
// Thought.create(
//   { thoughtText: 'Loreum', username : 'NA' },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// );
//****************************************** */

module.exports = Thought;