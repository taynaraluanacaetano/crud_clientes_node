const activityModel = require('../model/activityModel');

exports.getAllActivities = () => {
  return activityModel.getAllActivities();
};

exports.createActivity = (activityData) => {
  return activityModel.createActivity(activityData);
};

exports.deleteActivity = (activityData) => {
  return activityModel.deleteActivity(activityData);
};

exports.getActivityById = (activityId) => {
  return activityModel.getActivityById(activityId);
};

exports.updateActivity = (activityId, activityData) => {
  return activityModel.updateActivity(activityId, activityData);
};
