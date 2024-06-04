const express = require('express');
const router = express.Router();
const activityController = require('../controller/activityController');

router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getActivitiesById);
router.post('/', activityController.createActivity);
router.delete('/:id', activityController.deleteActivity);
router.put('/:id', activityController.updateActivity);

module.exports = router;
