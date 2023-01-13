//imports dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//set up for express app
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//opens connection to mongoose model in the database, then connect to server 
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}.`);
  });
});