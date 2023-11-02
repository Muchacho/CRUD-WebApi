const express = require('express');
const router = express.Router();
const MeetupController = require('../controllers/MeetupController');
const meetupController = new MeetupController();

router.get('', meetupController.getAllMeetups);
router.get('/:name', meetupController.getMeetup);
router.post('/', meetupController.addMeetup);
router.put('/:name', meetupController.updateMeetup);
router.delete('/:name', meetupController.deleteMeetup);


module.exports = router;