const express = require('express');
const router = express.Router();
const MeetupController = require('../controllers/MeetupController');
const meetupController = new MeetupController();


module.exports = router;