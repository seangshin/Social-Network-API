//import express.Router() functjion used to create a new router object and api directory
const router = require('express').Router();
const apiRoutes = require('./api');

//use middleware for routes served within api directory
router.use('/api', apiRoutes);
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;