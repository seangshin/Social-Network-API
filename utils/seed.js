const { Mongoose } = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
//const { getRandomName, getRandomAssignments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const usernames = [
  { username: 'johndoe', email: 'johndoe@email.com' },
  { username: 'janedoe', email: 'janedoe@email.com' },
  { username: 'billsmith', email: 'billsmith@email.com' },
  { username: 'jillsmith', email: 'jillsmith@email.com' },
  ];

  const thoughts = [
  { thoughtText: 'Thought1', username: null },
  { thoughtText: 'Thought2', username: null },
  { thoughtText: 'Thought3', username: null },
  { thoughtText: 'Thought4', username: null },
  ];

  const seededUsers = await User.create(usernames);

  for (let i=0; i<seededUsers.length; i++) {
    thoughts[i].username = seededUsers[i]._id;
  }

  const seededThoughts = await Thought.create(thoughts);
  console.log(`Created ${thoughts.length} thoughts.`)

  console.info('Seeding complete! 🌱');
  process.exit(0);

  
});
