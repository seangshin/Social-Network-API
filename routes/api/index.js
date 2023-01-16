//import express router and routes within the api directory
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

//use modular routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

//export router
module.exports = router;
