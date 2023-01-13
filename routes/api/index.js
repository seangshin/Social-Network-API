//import express router and routes within the api directory
const router = require('express').Router();
const userRoutes = require('./userRoutes');

//use modular routes
router.use('/users', userRoutes);

//export router
module.exports = router;
