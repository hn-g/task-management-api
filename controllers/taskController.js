const TaskModel = require('../models/taskModel');

class TaskController {

static getAllTasks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    TaskModel.getAllTasks(page, pageSize, (error, tasks) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }

      res.json({
        currentPage: page,
        pageSize: pageSize,
        tasks: tasks
      });
    });
  }


static createTask(req, res) {
  const newTask = req.body;

  TaskModel.createTask(newTask, (error, result) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
}

static updateTask(req, res) {
  const taskId = req.params.taskId;
  const updatedTask = req.body;

  TaskModel.updateTask(taskId, updatedTask, (error, result) => {
    if (error) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
}

  static getTaskMetricsByStatus(req, res) {
    TaskModel.getTaskMetricsByStatus((error, metrics) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(metrics);
    });
  }

  static getTaskMetricsByTimeline(req, res) {
    TaskModel.getTaskMetricsByTimeline((error, metrics) => {
      if (error) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(metrics);
    });
  }
}

module.exports = TaskController;
