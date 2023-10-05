const express = require('express');
const TaskController = require('../controllers/taskController');

const router = express.Router();

router.route('/')
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask);

router.route('/:taskId')
  .put(TaskController.updateTask);

router.get('/metrics/status', TaskController.getTaskMetricsByStatus);
router.get('/metrics/timeline', TaskController.getTaskMetricsByTimeline);

module.exports = router;
